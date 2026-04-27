import sys
import json
import os

# Add FreeCAD lib to path when running via FreeCAD's python.exe
sys.path.insert(0, "C:/Program Files/FreeCAD 1.1/lib")

def get_shape_type(shape):
    t = shape.ShapeType
    type_map = {
        "Compound": "Compound",
        "CompSolid": "CompSolid",
        "Solid": "Solid",
        "Shell": "Shell",
        "Face": "Face",
        "Wire": "Wire",
        "Edge": "Edge",
        "Vertex": "Vertex",
    }
    return type_map.get(t, t)

def bbox_to_dict(shape):
    try:
        bb = shape.BoundBox
        return {
            "xMin": round(bb.XMin, 3),
            "yMin": round(bb.YMin, 3),
            "zMin": round(bb.ZMin, 3),
            "xMax": round(bb.XMax, 3),
            "yMax": round(bb.YMax, 3),
            "zMax": round(bb.ZMax, 3),
            "xLen": round(bb.XLength, 3),
            "yLen": round(bb.YLength, 3),
            "zLen": round(bb.ZLength, 3),
        }
    except Exception:
        return None

def classify_stock(shape):
    """
    Classifies stock into: round | hex | rect

    Algorithm uses two independent geometric signals from FreeCAD/OCC:

    SIGNAL A — Rotational symmetry via PrincipalProperties (inertia tensor):
        A solid that is rotationally symmetric about an axis (cylinder, ring,
        any round bar even with bores/flats/keyways) has TWO of its three
        principal moments of inertia equal. Hex bars also share this property
        but only approximately (their 6-fold symmetry is "close to" rotational).
        Rectangular blocks generally have THREE distinct moments.

    SIGNAL B — Face composition:
        - Round = at least one outer cylindrical face whose axis matches the
          rotational symmetry axis from Signal A.
        - Hex = exactly 8 planar faces (6 sides + 2 ends), no curved faces.
        - Rect = mostly planar faces, no rotational symmetry.

    Decision tree:
        1. If face count == 8 AND all planar AND principal moments show 2-fold
           symmetry → HEX.
        2. Else if PrincipalProperties shows 2 equal moments AND there's an
           outer cylindrical face on the symmetry axis → ROUND.
        3. Else → RECT.
    """
    import math

    def up(v):
        return math.ceil((v + 2) / 5) * 5

    try:
        bb = shape.BoundBox
        dims_raw = [bb.XLength, bb.YLength, bb.ZLength]
        dims = sorted(dims_raw)

        # ── Face inventory ───────────────────────────────────────────────────
        face_types = {}
        for face in shape.Faces:
            stype = type(face.Surface).__name__
            face_types[stype] = face_types.get(stype, 0) + 1
        total_faces = sum(face_types.values())
        plane_count = face_types.get("Plane", 0)
        cyl_count = face_types.get("Cylinder", 0)
        is_all_planar = plane_count == total_faces

        # ── Principal moments of inertia (rotational symmetry signal) ────────
        # PrincipalProperties returns dict with 'Moments' (3 floats, sorted desc)
        # and the three principal axes as Vectors.
        sym_axis = None  # symmetry axis (Vector), if rotationally symmetric
        symmetry_kind = "none"  # "rot" (2 equal), "iso" (3 equal), "none"

        try:
            pp = shape.PrincipalProperties
            moments = list(pp["Moments"])  # [I1, I2, I3] sorted descending
            axes = [pp["FirstAxisOfInertia"], pp["SecondAxisOfInertia"], pp["ThirdAxisOfInertia"]]

            m_max = max(moments)
            # Normalised pairwise differences
            d01 = abs(moments[0] - moments[1]) / m_max if m_max > 0 else 1
            d12 = abs(moments[1] - moments[2]) / m_max if m_max > 0 else 1
            d02 = abs(moments[0] - moments[2]) / m_max if m_max > 0 else 1

            # 2 equal → rotational symmetry → the unique axis is the symmetry axis
            EQ = 0.05  # 5% tolerance for "equal" moments
            if d01 < EQ and d12 < EQ and d02 < EQ:
                symmetry_kind = "iso"  # cube or sphere
            elif d01 < EQ:
                # I1 ≈ I2, I3 different → axis 3 is the symmetry axis
                symmetry_kind = "rot"
                sym_axis = axes[2]
            elif d12 < EQ:
                # I2 ≈ I3, I1 different → axis 1 is the symmetry axis
                symmetry_kind = "rot"
                sym_axis = axes[0]
            elif d02 < EQ:
                # I1 ≈ I3, I2 different → axis 2 is the symmetry axis
                symmetry_kind = "rot"
                sym_axis = axes[1]
        except Exception:
            pass

        # ── HEX check ────────────────────────────────────────────────────────
        # 6 side faces + 2 ends = 8 planar faces, with rotational symmetry
        if is_all_planar and total_faces == 8 and symmetry_kind == "rot":
            # Determine length axis from sym_axis
            length_dim = _axis_aligned_length(sym_axis, dims_raw, dims)
            cross_dims = [d for d in dims_raw if d != length_dim] if length_dim in dims_raw else [dims[0], dims[1]]
            across_flats = round(sum(cross_dims) / len(cross_dims), 3) if cross_dims else round(dims[0], 3)
            length = round(length_dim, 3)
            return {
                "stockShape": "hex",
                "acrossFlats": across_flats,
                "length": length,
                "stockAcrossFlats": up(across_flats),
                "stockLength": up(length),
            }

        # ── ROUND check ──────────────────────────────────────────────────────
        # Need: rotational symmetry + outer cylindrical face whose axis
        # passes through the part's centroid (otherwise it's a curved patch on
        # a non-round part, e.g. a rod conforming to a sleeve).
        if symmetry_kind == "rot" and cyl_count > 0 and sym_axis is not None:
            centroid = shape.CenterOfMass
            # Cross-section reference: the bbox dim perpendicular to sym_axis,
            # used as a sanity check on radius.
            length_dim = _axis_aligned_length(sym_axis, dims_raw, dims)
            cross_dims = [d for d in dims_raw if d != length_dim]
            max_cross = max(cross_dims) if cross_dims else dims[2]

            # Find the largest OUTER cylinder aligned with sym_axis whose axis
            # passes near the centroid. That's the part's main barrel.
            barrel_radius = 0.0

            for face in shape.Faces:
                surf = face.Surface
                if type(surf).__name__ != "Cylinder":
                    continue
                ax = surf.Axis
                dot = abs(ax.x * sym_axis.x + ax.y * sym_axis.y + ax.z * sym_axis.z)
                if dot < 0.95:
                    continue
                # Axis must pass near the centroid (inside the part)
                cx = centroid.x - surf.Center.x
                cy = centroid.y - surf.Center.y
                cz = centroid.z - surf.Center.z
                proj = cx * ax.x + cy * ax.y + cz * ax.z
                px = cx - proj * ax.x
                py = cy - proj * ax.y
                pz = cz - proj * ax.z
                dist_to_axis = math.sqrt(px * px + py * py + pz * pz)
                if dist_to_axis > surf.Radius * 0.5:
                    continue
                # Reject cylinders much larger than the part's bbox cross-section
                # (these are conform-to-other-part patches, not real outer walls)
                if surf.Radius > max_cross / 2 * 1.15:
                    continue
                if not _is_outer_cylinder(face, surf, shape):
                    continue
                if surf.Radius > barrel_radius:
                    barrel_radius = float(surf.Radius)

            if barrel_radius > 0:
                diameter = round(barrel_radius * 2, 3)
                length = round(length_dim, 3)
                return {
                    "stockShape": "round",
                    "diameter": diameter,
                    "length": length,
                    "stockDiameter": up(diameter),
                    "stockLength": up(length),
                }

        # ── RECT (default) ───────────────────────────────────────────────────
        return {
            "stockShape": "rect",
            "x": round(dims[0], 3),
            "y": round(dims[1], 3),
            "z": round(dims[2], 3),
            "stockX": up(dims[0]),
            "stockY": up(dims[1]),
            "stockZ": up(dims[2]),
        }

    except Exception as e:
        bb = shape.BoundBox
        dims = sorted([bb.XLength, bb.YLength, bb.ZLength])
        return {"stockShape": "rect", "x": dims[0], "y": dims[1], "z": dims[2],
                "stockX": dims[0], "stockY": dims[1], "stockZ": dims[2], "error": str(e)}


def _axis_aligned_length(axis_vec, dims_raw, dims_sorted):
    """Pick the bbox dimension most aligned with the given axis vector."""
    if axis_vec is None:
        return dims_sorted[2]  # longest as fallback
    ax, ay, az = abs(axis_vec.x), abs(axis_vec.y), abs(axis_vec.z)
    if ax >= ay and ax >= az:
        return dims_raw[0]
    elif ay >= ax and ay >= az:
        return dims_raw[1]
    else:
        return dims_raw[2]


def _is_outer_cylinder(face, surf, parent_shape):
    """
    Returns True if face is the OUTER wall of the part (not a bore).
    Uses isInside on points stepped along the face normal, which is the most
    reliable test (works for any orientation, off-axis cylinders, etc).
    """
    try:
        u_min, u_max, v_min, v_max = face.ParameterRange
        u_mid = (u_min + u_max) / 2
        v_mid = (v_min + v_max) / 2
        pt = face.valueAt(u_mid, v_mid)
        normal = face.normalAt(u_mid, v_mid)
        if face.Orientation == "Reversed":
            normal = type(normal)(-normal.x, -normal.y, -normal.z)
        step = max(0.01, surf.Radius * 0.001)
        outward_pt = type(pt)(pt.x + normal.x * step, pt.y + normal.y * step, pt.z + normal.z * step)
        inward_pt = type(pt)(pt.x - normal.x * step, pt.y - normal.y * step, pt.z - normal.z * step)
        out_in = parent_shape.isInside(outward_pt, 0.001, True)
        in_in = parent_shape.isInside(inward_pt, 0.001, True)
        # OUTER wall: outward step lands outside, inward step lands inside material
        return in_in and not out_in
    except Exception:
        return False

def walk_shape(shape, label="Root", depth=0):
    node = {
        "label": label,
        "type": get_shape_type(shape),
        "boundingBox": bbox_to_dict(shape),
        "children": [],
    }

    try:
        if hasattr(shape, "Solids") and shape.ShapeType == "Compound":
            for i, solid in enumerate(shape.Solids):
                node["children"].append(walk_shape(solid, f"Solid_{i+1}", depth + 1))
        elif hasattr(shape, "SubShapes"):
            for i, sub in enumerate(shape.SubShapes):
                node["children"].append(walk_shape(sub, f"{get_shape_type(sub)}_{i+1}", depth + 1))
    except Exception:
        pass

    return node

import re

def clean_label(label):
    # Strip FreeCAD's auto-prefix: step_<timestamp>_<rest> → <rest>
    return re.sub(r'^step_\d+_', '', label) or label

def safe_filename(name, index):
    """Sanitize a part name for use as a filename."""
    clean = re.sub(r'[^\w\-]', '_', name)
    return f"part_{index:03d}_{clean}.step"

def extract_parts(filepath, out_dir):
    import FreeCAD
    import Part

    os.makedirs(out_dir, exist_ok=True)

    doc = FreeCAD.newDocument("parse")
    Part.insert(filepath, doc.Name)

    parts = []
    part_index = 0

    for obj in doc.Objects:
        if not (hasattr(obj, "Shape") and obj.Shape is not None):
            continue

        label = clean_label(obj.Label if obj.Label else obj.Name)
        shape = obj.Shape
        shape_type = get_shape_type(shape)
        bbox = bbox_to_dict(shape)

        try:
            solid_count = len(shape.Solids)
        except Exception:
            solid_count = 0

        if shape_type == "Compound" and solid_count > 1:
            children = []
            for i, solid in enumerate(shape.Solids):
                child_name = f"{label}_Solid{i+1:03d}" if i > 0 else f"{label}_Solid"
                fname = safe_filename(child_name, part_index)
                out_path = os.path.join(out_dir, fname)
                Part.export([solid], out_path)
                children.append({
                    "name": child_name,
                    "type": "Solid",
                    "boundingBox": bbox_to_dict(solid),
                    "stock": classify_stock(solid),
                    "stepFile": fname,
                    "children": [],
                })
                part_index += 1

            parts.append({
                "name": label,
                "type": shape_type,
                "solidCount": solid_count,
                "boundingBox": bbox,
                "stock": classify_stock(shape),
                "stepFile": None,
                "children": children,
            })
        else:
            fname = safe_filename(label, part_index)
            out_path = os.path.join(out_dir, fname)
            Part.export([shape], out_path)
            parts.append({
                "name": label,
                "type": shape_type,
                "solidCount": solid_count,
                "boundingBox": bbox,
                "stock": classify_stock(shape),
                "stepFile": fname,
                "children": [],
            })
            part_index += 1

    FreeCAD.closeDocument(doc.Name)
    return parts

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: extract_parts.py <step_file> <out_dir>"}))
        sys.exit(1)

    filepath = sys.argv[1]
    out_dir = sys.argv[2]

    if not os.path.exists(filepath):
        print(json.dumps({"error": f"File not found: {filepath}"}))
        sys.exit(1)

    try:
        parts = extract_parts(filepath, out_dir)
        output = json.dumps({"parts": parts, "outDir": out_dir})
    except Exception as e:
        output = json.dumps({"error": str(e)})

    sys.stdout.write("\n__RESULT__" + output + "__END__\n")
    sys.stdout.flush()
