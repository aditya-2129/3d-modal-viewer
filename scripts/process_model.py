import sys
import os
import json

# FreeCAD path setup — mirror extract_parts.py
if sys.platform == "win32":
    win_path = "C:/Program Files/FreeCAD 1.1/lib"
    if os.path.exists(win_path):
        sys.path.insert(0, win_path)
elif os.path.exists("/usr/lib/freecad/lib"):
    sys.path.insert(0, "/usr/lib/freecad/lib")
elif os.path.exists("/usr/lib/freecad-python3/lib"):
    sys.path.insert(0, "/usr/lib/freecad-python3/lib")
elif os.path.exists("/snap/freecad/current/usr/lib"):
    sys.path.insert(0, "/snap/freecad/current/usr/lib")
else:
    import glob as _glob
    for _p in sorted(_glob.glob("/nix/store/*freecad*/lib"), reverse=True):
        if os.path.exists(os.path.join(_p, "FreeCAD.so")):
            sys.path.insert(0, _p)
            break

# Add trimesh user-install path
_trimesh_path = os.path.expanduser("~/.local/lib/python3.12/site-packages")
if os.path.exists(_trimesh_path) and _trimesh_path not in sys.path:
    sys.path.insert(0, _trimesh_path)

sys.path.insert(0, os.path.dirname(__file__))
from extract_parts import (
    clean_label, get_face_stats, detect_symmetry, classify_stock,
    compute_group_key, center_of_mass_dict, get_shape_type, bbox_to_dict
)


def _add_to_scene(scene, shape, node_name):
    import trimesh
    try:
        verts, faces = shape.tessellate(0.1)
        mesh = trimesh.Trimesh(
            vertices=[(v.x, v.y, v.z) for v in verts],
            faces=list(faces),
            process=False,
        )
        scene.add_geometry(mesh, node_name=node_name)
    except Exception:
        pass


def process_model(filepath, out_dir):
    import FreeCAD
    import Part
    import trimesh

    os.makedirs(out_dir, exist_ok=True)
    doc = FreeCAD.newDocument("parse")
    Part.insert(filepath, doc.Name)

    parts = []
    mapping = []
    scene = trimesh.Scene()
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
                solid_stats = get_face_stats(solid)
                solid_sym = detect_symmetry(solid)

                node_name = f"part_{part_index}"
                _add_to_scene(scene, solid, node_name)
                mapping.append({"partIndex": part_index, "nodeName": node_name, "label": child_name})

                children.append({
                    "name": child_name,
                    "type": "Solid",
                    "boundingBox": bbox_to_dict(solid),
                    "stock": classify_stock(solid),
                    "stepFile": None,
                    "children": [],
                    "groupKey": compute_group_key(solid, solid_stats, solid_sym),
                    "centerOfMass": center_of_mass_dict(solid),
                    "globalIndex": part_index,
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
            solid_stats = get_face_stats(shape)
            solid_sym = detect_symmetry(shape)

            node_name = f"part_{part_index}"
            _add_to_scene(scene, shape, node_name)
            mapping.append({"partIndex": part_index, "nodeName": node_name, "label": label})

            parts.append({
                "name": label,
                "type": shape_type,
                "solidCount": solid_count,
                "boundingBox": bbox,
                "stock": classify_stock(shape),
                "stepFile": None,
                "children": [],
                "groupKey": compute_group_key(shape, solid_stats, solid_sym),
                "centerOfMass": center_of_mass_dict(shape),
                "globalIndex": part_index,
            })
            part_index += 1

    glb_path = os.path.join(out_dir, "model.glb")
    scene.export(glb_path)
    FreeCAD.closeDocument(doc.Name)
    return parts, mapping, glb_path


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.stdout.write("\n__RESULT__" + json.dumps({"error": "Usage: process_model.py <step_file> <out_dir>"}) + "__END__\n")
        sys.exit(1)

    filepath, out_dir = sys.argv[1], sys.argv[2]
    if not os.path.exists(filepath):
        sys.stdout.write("\n__RESULT__" + json.dumps({"error": f"File not found: {filepath}"}) + "__END__\n")
        sys.exit(1)

    try:
        parts, mapping, glb_path = process_model(filepath, out_dir)
        output = json.dumps({"parts": parts, "mapping": mapping, "glbPath": glb_path})
    except Exception as e:
        output = json.dumps({"error": str(e)})

    sys.stdout.write("\n__RESULT__" + output + "__END__\n")
    sys.stdout.flush()
