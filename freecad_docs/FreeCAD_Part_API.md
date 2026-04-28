# FreeCAD.Part — Full API Reference

> Extracted from `FreeCAD.Part.html`. Source: `C:\Program Files\FreeCAD 1.1\lib\part.pyd`
> OCC_VERSION: `7.8.1`

Sub-modules: `BRepFeat`, `BRepOffsetAPI`, `ChFi2d`, `Geom2d`, `GeomPlate`, `HLRBRep`, `ShapeFix`, `ShapeUpgrade`

---

## `AttachEngine` (Base.BaseClass)

Abstract class — functionality of AttachableObject, but outside of DocumentObject.

**Properties**

| Name | Description |
|---|---|
| `AttacherType` | Type of engine: 3d, plane, line, or point. |
| `AttachmentOffset` | Current attachment offset placement. |
| `CompleteModeList` | List of all attachment modes across all AttachEngines (MapMode enum values). |
| `CompleteRefTypeList` | All reference shape types recognized by AttachEngine. |
| `ImplementedModes` | Modes implemented by this engine instance. |
| `Mode` | Current attachment mode. |
| `Parameter` | Parameter value for curve attachment modes. Range 0..1 = full edge length (extrapolation allowed). |
| `References` | Current references list. |
| `Reverse` | If True, Z axis of attached placement is flipped (X also flipped to keep right-handed CS). |
| `Module` | Module in which this class is defined. |
| `TypeId` | Type of the FreeCAD object with module domain. |

**Methods**

- `calculateAttachedPlacement(orig_placement)` — Returns result of attachment based on current Mode, References, etc. AttachmentOffset included. orig_placement used only for Translate mode. Returns new Placement or None if not attached; raises on failure.
- `copy()` — Returns a new AttachEngine instance.
- `downgradeRefType(type)` — Returns next more general type. e.g. "Circle" → "Curve".
- `getModeInfo(mode)` — Returns dict with supported reference combinations and user-friendly name.
- `getRefTypeInfo(type)` — Returns dict: keys "UserFriendlyName", "TypeIndex", "Rank". Rank = number of possible downgrades before reaching "Any".
- `getRefTypeOfShape(shape)` — Returns shape type string as interpreted by AttachEngine.
- `isFittingRefType(type_shape, type_needed)` — Tests if type_shape fits type_needed. e.g. "Circle" fits "Edge"; "Curve" does not fit "Circle".
- `readParametersFromFeature(document_object)` — Sets AttachEngine params by reading properties of an AttachableObject-derived feature.
- `suggestModes()` — Mode suggestion routine. Returns dict with keys: `allApplicableModes`, `bestFitMode`, `error`, `message` (OK / IncompatibleGeometry / NoModesFit / UnexpectedError), `nextRefTypeHint`, `reachableModes`, `references_Types`.
- `writeParametersToFeature(document_object)` — Updates AttachableObject feature properties from current AttachEngine params. **Warning:** crashes FreeCAD if a linked feature was deleted.
- `getAllDerivedFrom()` — Returns all descendants.
- `isDerivedFrom(type)` — Returns true if given type is a parent.

---

## `Precision` (builtins.PyObjectBase)

OCC tolerance constants helper.

**Static methods (call as `Precision.method()`):**

| Method | Returns |
|---|---|
| `confusion()` | Recommended tolerance for coincidence of two points in real space |
| `angular()` | Recommended tolerance for angle equality (radians) |
| `approximation()` | Precision for approximation algorithms |
| `intersection()` | Precision for intersection algorithms |
| `infinite()` | A large number treated as infinite |
| `isInfinite(R)` | True if R may be considered infinite |
| `isNegativeInfinite(R)` | True if R may be considered negative infinite |
| `isPositiveInfinite(R)` | True if R may be considered positive infinite |
| `parametric(realPrecision)` | Convert real space precision to parametric space |
| `squareConfusion()` | Square of confusion value |

---

## Module-level functions (Part.*)

| Function | Description |
|---|---|
| `Part.insert(filepath, docName)` | Insert STEP/BREP file into an existing document |
| `Part.read(filepath)` | Load file and return the Shape directly (no document needed) |
| `Part.open(filepath)` | Create a new document and load the file into it |
| `Part.export([shapes], filepath)` | Export list of shapes into a single file |
| `Part.exportUnits([unit])` | Set/get units for STEP/IGES export. Values: MM M INCH FT MI KM MIL UM CM UIN |
| `Part.show(shape, [name])` | Add shape to active document (creates one if needed). Returns document object. |
| `Part.cast_to_shape(shape)` | Cast to the actual concrete shape type |
| `Part.clearShapeCache()` | Clears internal shape cache |
| `Part.getFacets(shape)` | Simplified mesh generation |
| `Part.getShape(obj, subname, mat, needSubElement, transform, retType)` | Get TopoShape with SubName reference. retType 0=shape, 1=(shape,mat,subObj), 2=same but resolves links |
| `Part.getSortedClusters(edges)` | Sort and cluster a variety of edges |
| `Part.sortEdges(edges, [tol3d])` | Sort all input edges into connected lists. tol defaults to Precision::Confusion |
| `Part.__sortEdges__(edges)` | Sort unsorted list so consecutive edges share vertices. Returns first connected set only. |
| `Part.makeBox(l, w, h, [pnt, dir])` | Box at pnt. Default pnt=(0,0,0), dir=(0,0,1) |
| `Part.makeCylinder(r, h, [pnt, dir, angle])` | Cylinder. Default angle=360 |
| `Part.makeCone(r1, r2, h, [pnt, dir, angle])` | Cone with given radii and height. Default angle=360 |
| `Part.makeSphere(r, [pnt, dir, a1, a2, a3])` | Sphere. Default a1=0, a2=90, a3=360 |
| `Part.makeTorus(r1, r2, [pnt, dir, a1, a2, a])` | Torus |
| `Part.makeWedge(xmin,ymin,zmin,z2min,x2min, xmax,ymax,zmax,z2max,x2max, [pnt,dir])` | Wedge |
| `Part.makePlane(l, w, [pnt, dirZ, dirX])` | Planar face |
| `Part.makeCircle(r, [pnt, dir, a1, a2])` | Circle edge. Default a1=0, a2=360 |
| `Part.makeLine(start, end)` | Line edge between two Vectors or (x,y,z) tuples. Returns Edge. |
| `Part.makePolygon(pts)` | Polygon wire from list of Vectors. Not closed if first != last. |
| `Part.makeCompound(shapes)` | Compound from list of shapes |
| `Part.makeShell(faces)` | Shell from list of faces |
| `Part.makeShellFromWires(wires)` | Shell from wires (must have same edge count) |
| `Part.makeSolid(shape)` | Solid from shells of shape. CompSolid creates overall volume solid. |
| `Part.makeFace(shapes, maker_class_name)` | Face via facemaker e.g. "Part::FaceMakerSimple" |
| `Part.makeFilledFace(edges)` | Face from list of edges |
| `Part.makeFilledSurface(curves, tol)` | Surface from list of curves |
| `Part.makeRevolution(curve, [vmin, vmax, angle, pnt, dir, shapetype])` | Revolved shape. Default angle=360, shapetype=Part.Solid |
| `Part.makeLoft(wires, [solid, ruled, closed, maxDegree])` | Loft shape |
| `Part.makeRuledSurface(e1, e2)` | Ruled surface from two edges or wires (same edge count if wires) |
| `Part.makeHelix(pitch, h, r, [angle])` | Helix. Conical if angle (apex in degrees) is set. |
| `Part.makeLongHelix(pitch, h, r, [angle], [hand])` | Multi-edge helix |
| `Part.makeThread(pitch, depth, h, r)` | Thread shape |
| `Part.makeTube(edge, r, [continuity, maxDeg, maxSeg])` | Tube. Continuity: C0 C1 C2 C3 CN G1 G2 |
| `Part.makeSweepSurface(path, profile, [float])` | Profile swept along a path |
| `Part.makeSplitShape(shape, pairs, [checkInterior])` | Split shape by pairs (Wire,Face) (Edge,Face) (Edge,Edge). Returns two lists. |
| `Part.makeWireString(string, fontdir, fontfile, h, [track])` | Wires forming text characters |
| `Part.joinSubname(sub, mapped, subElement)` | Join subname parts into a subname string |
| `Part.splitSubname(subname)` | Split subname into [sub, mapped, subElement] |
| `Part.setStaticValue(name, value)` | Set a static named value (string, int, or float) |