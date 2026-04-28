# FreeCAD Docs — Agent Navigation Map

All docs are now clean `.md` files. No HTML files remain.

---

## Files in this folder

| File | What it contains | Tokens (approx) |
|---|---|---|
| `API_MAP.md` | This file — read first | ~200 |
| `Part_API.md` | All 52 Part classes + 45 module functions, full signatures and descriptions | ~6 000 |
| `PartEnums_API.md` | 7 enums with all member values | ~100 |
| `FreeCAD_Part_API.md` | AttachEngine, Precision classes + complete module function table | ~600 |
| `AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md` | App-specific patterns, code examples, best practices | ~1 200 |
| `FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md` | Broad capability survey across all FreeCAD modules | ~1 500 |
| `FREECAD_AGENT_START_HERE.md` | Task routing index for agents | ~400 |

---

## How to use this map

1. Find your task in the sections below.
2. Note which file + which section heading to jump to.
3. Read only that section — do not load whole files unless you need them.

---

## 1. Document lifecycle

`FreeCAD.newDocument`, `openDocument`, `closeDocument`, `activeDocument`, `listDocuments`

→ `AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md` — section "Core modules you can rely on"
→ `FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md` — section "1. Core application and document API"

Runtime reference: call `help(FreeCAD)` inside FreeCAD Python — these are not in the local docs.

---

## 2. STEP import / export

→ `FreeCAD_Part_API.md` — section "Module-level functions (Part.*)"

Key functions:
- `Part.insert(filepath, docName)` — insert into existing document
- `Part.read(filepath)` — return Shape directly, no document
- `Part.open(filepath)` — new document + load
- `Part.export([shapes], filepath)` — export list of shapes
- `Part.exportUnits([unit])` — set units: MM M INCH FT MI KM MIL UM CM UIN

---

## 3. Shape topology — properties by class

All class detail is in `Part_API.md`. Jump to `### ClassName` headings.

| What you need | Class heading in Part_API.md |
|---|---|
| `ShapeType`, `Solids`, `Faces`, `Edges`, `Wires`, `Shells`, `Vertexes`, `SubShapes`, `Compounds`, `CompSolids` | `### Shape` |
| `Orientation`, `BoundBox`, `Placement`, `Volume`, `Area`, `Length` | `### Shape` |
| `OuterShell`, `CenterOfMass`, `PrincipalProperties`, `Mass`, `MatrixOfInertia` | `### Solid` |
| `OuterWire`, `Surface`, `ParameterRange`, `CenterOfMass`, `PrincipalProperties` | `### Face` |
| `Curve`, `Length`, `FirstParameter`, `LastParameter`, `Closed`, `Degenerated` | `### Edge` |
| `Point`, `X`, `Y`, `Z`, `Tolerance` | `### Vertex` |
| `OrderedEdges`, `OrderedVertexes`, `Continuity` | `### Wire` |
| Shell-specific inertia | `### Shell` |
| Compound (no extra properties) | `### Compound` — use `shape.Solids` |

---

## 4. Bounding box

`shape.BoundBox` → property on all Shape subclasses → `Part_API.md` `### Shape`

BoundBox attributes (these are Base types, not in local docs):
- `.XMin .YMin .ZMin .XMax .YMax .ZMax`
- `.XLength .YLength .ZLength`
- `.Center` → Vector of center point

---

## 5. Inertia, centroid, principal properties

All on Solid, Shell, Face, Wire classes → `Part_API.md`

- `shape.CenterOfMass` → Vector
- `shape.PrincipalProperties` → dict with keys:
  - `Moments` — list of 3 floats [I1, I2, I3] sorted descending
  - `FirstAxisOfInertia`, `SecondAxisOfInertia`, `ThirdAxisOfInertia` — Vectors
- `shape.Mass` → float
- `shape.MatrixOfInertia` → 3×3 matrix
- `shape.StaticMoments` → (Ix, Iy, Iz)

---

## 6. Face inspection

→ `Part_API.md` `### Face`

Key members:
- `face.Surface` — returns surface object (Cylinder, Plane, Cone, Toroid, etc.)
- `face.Area` — float
- `face.ParameterRange` — tuple (uMin, uMax, vMin, vMax)
- `face.Orientation` — string "Forward" / "Reversed"
- `face.OuterWire` — Wire
- `face.normalAt(u, v)` — Vector
- `face.valueAt(u, v)` — Point on surface
- `face.tangentAt(u, v)` — tangent vector
- `face.curvatureAt(u, v)` — curvature
- `face.isInside(pt, tol, checkFace)` — bool

---

## 7. Surface types

`type(face.Surface).__name__` returns one of these. Each is a class in `Part_API.md`.

| Class name | Key properties | Heading |
|---|---|---|
| `Cylinder` | `Axis`, `Center`, `Radius` | `### Cylinder` |
| `Plane` | `Axis`, `Position` | `### Plane` |
| `Cone` | `Apex`, `Axis`, `Center`, `Radius`, `SemiAngle` | `### Cone` |
| `Sphere` | `Axis`, `Center`, `Radius` | `### Sphere` |
| `Toroid` | `Axis`, `Center`, `MajorRadius`, `MinorRadius` | `### Toroid` |
| `SurfaceOfRevolution` | `BasisCurve`, `Direction`, `Location` | `### SurfaceOfRevolution` |
| `SurfaceOfExtrusion` | `BasisCurve`, `Direction` | `### SurfaceOfExtrusion` |
| `BSplineSurface` | full class | `### BSplineSurface` |
| `BezierSurface` | full class | `### BezierSurface` |

---

## 8. Shape boolean / transform methods

All on Shape class → `Part_API.md` `### Shape` — Methods section.

| Method | What it does |
|---|---|
| `cut(other)` | Boolean difference |
| `fuse(other)` | Boolean union |
| `common(other)` | Boolean intersection |
| `section(other)` | Cross-section |
| `multiFuse([...])` | Fuse with multiple shapes |
| `generalFuse([...])` | General fuse with fragments |
| `copy()` | Duplicate shape |
| `transformShape(matrix)` | Apply matrix transform in place |
| `translate(vec)` / `rotate(...)` / `mirror(...)` / `scale(...)` | Transforms |
| `isInside(pt, tol, checkFace)` | Point containment test |
| `distToShape(other)` | Minimum distance |
| `optimalBoundingBox(...)` | Tighter bounding box |

---

## 9. Shape construction (Part module functions)

→ `FreeCAD_Part_API.md` — section "Module-level functions (Part.*)"
→ `Part_API.md` — section "Module-level functions"

Quick lookup:

| Function | Makes |
|---|---|
| `Part.makeBox(l, w, h)` | Box |
| `Part.makeCylinder(r, h)` | Cylinder |
| `Part.makeCone(r1, r2, h)` | Cone |
| `Part.makeSphere(r)` | Sphere |
| `Part.makeTorus(r1, r2)` | Torus |
| `Part.makeCompound([shapes])` | Compound |
| `Part.makeShell([faces])` | Shell |
| `Part.makeSolid(shell)` | Solid from shell |
| `Part.makeFace(wire, method)` | Face from wire |
| `Part.makeRevolution(curve)` | Revolved shape |
| `Part.makeLoft([wires])` | Loft |
| `Part.makeLine(p1, p2)` | Line Edge |
| `Part.makePolygon([pts])` | Polygon Wire |

---

## 10. Curve types (via edge.Curve)

All in `Part_API.md`. Jump to `### ClassName`.

`Line`, `LineSegment`, `Circle`, `Arc`, `ArcOfCircle`, `ArcOfConic`, `ArcOfEllipse`, `ArcOfHyperbola`, `ArcOfParabola`, `Ellipse`, `Hyperbola`, `Parabola`, `BSplineCurve`, `BezierCurve`, `OffsetCurve`

---

## 11. Enumerations

→ `PartEnums_API.md`

| Enum | Members |
|---|---|
| `ShapeEnum` | COMPOUND=0, COMPSOLID=1, SOLID=2, SHELL=3, FACE=4, WIRE=5, EDGE=6, VERTEX=7, SHAPE=8 |
| `Orientation` | FORWARD=0, REVERSED=1, INTERNAL=2, EXTERNAL=3 |
| `Shape` (continuity) | C0=0, G1=1, C1=2, G2=3, C2=4, C3=5, CN=6 |
| `FillingStyle` | StretchStyle, CoonsStyle, CurvedStyle |
| `JoinType` | arc, intersection, tangent variants |

---

## 12. Shape export / serialisation

All methods on Shape → `Part_API.md` `### Shape`

| Method | Purpose |
|---|---|
| `exportStep(path)` | Write as STEP |
| `exportBrep(path)` | Write as BREP |
| `exportBrepToString()` | BREP as string |
| `exportStl(path)` | Write as STL mesh |
| `exportIges(path)` | Write as IGES |
| `importBrep(path)` | Load BREP into shape |
| `importBrepFromString(s)` | Load BREP from string |
| `tessellate(deflection)` | Returns (pts, faces) tuple |

---

## 13. AttachEngine and Precision

→ `FreeCAD_Part_API.md`

- `AttachEngine` — attachment constraint solver (not used in extract_parts.py but available)
- `Precision` — OCC tolerance constants: `confusion()`, `angular()`, `approximation()`, `intersection()`

---

## 14. Quick-lookup: exact properties used in extract_parts.py

| Code in script | Where to find the API detail |
|---|---|
| `shape.ShapeType` | `Part_API.md` → `### Shape` → Properties |
| `shape.BoundBox` → `.XMin/.XMax/.XLength` etc. | `Part_API.md` → `### Shape` → Properties |
| `shape.Solids` / `.Faces` / `.Edges` | `Part_API.md` → `### Shape` → Properties |
| `shape.Volume` / `.Area` | `Part_API.md` → `### Shape` → Properties |
| `shape.PrincipalProperties` | `Part_API.md` → `### Solid` → Properties |
| `shape.CenterOfMass` | `Part_API.md` → `### Solid` → Properties |
| `face.Surface` | `Part_API.md` → `### Face` → Properties |
| `type(face.Surface).__name__` → `"Cylinder"` etc. | See section 7 above |
| `face.Area` | `Part_API.md` → `### Face` → Properties |
| `face.Orientation` | `Part_API.md` → `### Face` → Properties |
| `face.ParameterRange` | `Part_API.md` → `### Face` → Properties |
| `face.normalAt(u, v)` | `Part_API.md` → `### Face` → Methods |
| `face.valueAt(u, v)` | `Part_API.md` → `### Face` → Methods |
| `surf.Axis` / `surf.Radius` / `surf.Center` | `Part_API.md` → `### Cylinder` → Properties |
| `shape.isInside(pt, tol, checkFace)` | `Part_API.md` → `### Shape` → Methods |
| `Part.insert(filepath, docName)` | `FreeCAD_Part_API.md` → Module-level functions |
| `Part.export([shape], path)` | `FreeCAD_Part_API.md` → Module-level functions |
