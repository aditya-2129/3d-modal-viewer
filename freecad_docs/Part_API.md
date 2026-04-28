# Part Module — Full API Reference

> Extracted from `Part.html` (FreeCAD 1.1, OCC 7.8.1)

## Class index

| Class | Inherits |
|---|---|
| `Arc` | `TrimmedCurve` |
| `ArcOfCircle` | `ArcOfConic` |
| `ArcOfConic` | `TrimmedCurve` |
| `ArcOfEllipse` | `ArcOfConic` |
| `ArcOfHyperbola` | `ArcOfConic` |
| `ArcOfParabola` | `ArcOfConic` |
| `AttachEngine` | `Base.BaseClass` |
| `BSplineCurve` | `BoundedCurve` |
| `BSplineSurface` | `GeometrySurface` |
| `BezierCurve` | `BoundedCurve` |
| `BezierSurface` | `GeometrySurface` |
| `BodyBase` | `Feature` |
| `Circle` | `Conic` |
| `CompSolid` | `Shape` |
| `Compound` | `Shape` |
| `Cone` | `GeometrySurface` |
| `Conic` | `Curve` |
| `Cylinder` | `GeometrySurface` |
| `Edge` | `Shape` |
| `Ellipse` | `Conic` |
| `Face` | `Shape` |
| `Feature` | `App.GeoFeature` |
| `GeometryBoolExtension` | `GeometryExtension` |
| `GeometryDoubleExtension` | `GeometryExtension` |
| `GeometryIntExtension` | `GeometryExtension` |
| `GeometryStringExtension` | `GeometryExtension` |
| `Hyperbola` | `Conic` |
| `Line` | `Curve` |
| `LineSegment` | `TrimmedCurve` |
| `OCCConstructionError` | `OCCDomainError` |
| `OCCDimensionError` | `OCCDomainError` |
| `OCCDomainError` | `OCCError` |
| `OCCError` | `Base.FreeCADError` |
| `OCCRangeError` | `OCCDomainError` |
| `OffsetCurve` | `Curve` |
| `OffsetSurface` | `GeometrySurface` |
| `Parabola` | `Conic` |
| `Part2DObject` | `Feature` |
| `Plane` | `GeometrySurface` |
| `PlateSurface` | `GeometrySurface` |
| `Point` | `Geometry` |
| `Precision` | `builtins.PyObjectBase` |
| `RectangularTrimmedSurface` | `GeometrySurface` |
| `Shape` | `Data.ComplexGeoData` |
| `Shell` | `Shape` |
| `Solid` | `Shape` |
| `Sphere` | `GeometrySurface` |
| `SurfaceOfExtrusion` | `GeometrySurface` |
| `SurfaceOfRevolution` | `GeometrySurface` |
| `Toroid` | `GeometrySurface` |
| `Vertex` | `Shape` |
| `Wire` | `Shape` |

---

## Module-level functions

All accessed as `Part.<name>(...)` after `import Part`.

### `Part.__fromPythonOCC__`

**Args:** `(...)`

__fromPythonOCC__(occ) -- Helper method to convert a pythonocc shape to an internal shape

### `Part.__sortEdges__`

**Args:** `(...)`

__sortEdges__(list of edges) -- list of edges
Helper method to sort an unsorted list of edges so that afterwards
the start and end vertex of two consecutive edges are geometrically coincident.
It returns a single list of edges and the algorithm stops after the first set of
connected edges which means that the output list can be smaller than the input list.
The sorted list can be used to create a Wire.

### `Part.__toPythonOCC__`

**Args:** `(...)`

__toPythonOCC__(shape) -- Helper method to convert an internal shape to pythonocc shape

### `Part.cast_to_shape`

**Args:** `(...)`

cast_to_shape(shape) -- Cast to the actual shape type

### `Part.clearShapeCache`

**Args:** `(...)`

clearShapeCache() -- Clears internal shape cache

### `Part.export`

**Args:** `(...)`

export(list,string) -- Export a list of objects into a single file.

### `Part.exportUnits`

**Args:** `(...)`

exportUnits([string=MM|M|INCH|FT|MI|KM|MIL|UM|CM|UIN]) -- Set units for exporting STEP/IGES files and returns the units.

### `Part.getFacets`

**Args:** `(...)`

getFacets(shape): simplified mesh generation

### `Part.getShape`

**Args:** `(...)`

getShape(obj,subname=None,mat=None,needSubElement=False,transform=True,retType=0):
Obtain the TopoShape of a given object with SubName reference

* obj: the input object
* subname: dot separated sub-object reference
* mat: the current transformation matrix
* needSubElement: if False, ignore the sub-element (e.g. Face1, Edge1) reference in 'subname'
* transform: if False, then skip obj's transformation. Use this if mat already include obj's
transformation matrix
* retType: 0: return TopoShape,
1: return (shape,mat,subObj), where subObj is the object referenced in 'subname',
and 'mat' is the accumulated transformation matrix of that sub-object.
2: same as 1, but make sure 'subObj' is resolved if it is a link.
* refine: refine the returned shape

### `Part.getSortedClusters`

**Args:** `(...)`

getSortedClusters(list of edges) -- Helper method to sort and cluster a variety of edges

### `Part.insert`

**Args:** `(...)`

insert(string,string) -- Insert the file into the given document.

### `Part.joinSubname`

**Args:** `(...)`

joinSubname(sub,mapped,subElement) -> subname

### `Part.makeBox`

**Args:** `(...)`

makeBox(length,width,height,[pnt,dir]) -- Make a box located
in pnt with the dimensions (length,width,height)
By default pnt=Vector(0,0,0) and dir=Vector(0,0,1)

### `Part.makeCircle`

**Args:** `(...)`

makeCircle(radius,[pnt,dir,angle1,angle2]) -- Make a circle with a given radius
By default pnt=Vector(0,0,0), dir=Vector(0,0,1), angle1=0 and angle2=360

### `Part.makeCompound`

**Args:** `(...)`

makeCompound(list) -- Create a compound out of a list of shapes.

### `Part.makeCone`

**Args:** `(...)`

makeCone(radius1,radius2,height,[pnt,dir,angle]) -- Make a cone with given radii and height
By default pnt=Vector(0,0,0), dir=Vector(0,0,1) and angle=360

### `Part.makeCylinder`

**Args:** `(...)`

makeCylinder(radius,height,[pnt,dir,angle]) -- Make a cylinder with a given radius and height
By default pnt=Vector(0,0,0),dir=Vector(0,0,1) and angle=360

### `Part.makeFace`

**Args:** `(...)`

makeFace(list_of_shapes_or_compound, maker_class_name) -- Create a face (faces) using facemaker class.
maker_class_name is a string like 'Part::FaceMakerSimple'.

### `Part.makeFilledFace`

**Args:** `(...)`

makeFilledFace(list) -- Create a face out of a list of edges.

### `Part.makeFilledSurface`

**Args:** `(...)`

makeFilledSurface(list of curves, tolerance) -- Create a surface out of a list of curves.

### `Part.makeHelix`

**Args:** `(...)`

makeHelix(pitch,height,radius,[angle]) -- Make a helix with a given pitch, height and radius
By default a cylindrical surface is used to create the helix. If the fourth parameter is set
(the apex given in degree) a conical surface is used instead

### `Part.makeLine`

**Args:** `(...)`

makeLine(startpnt,endpnt) -- Make a line between two points

Args:
startpnt (Vector or tuple): Vector or 3 element tuple 
containing the x,y and z coordinates of the start point,
i.e. (x1,y1,z1).
endpnt (Vector or tuple): Vector or 3 element tuple 
containing the x,y and z coordinates of the start point,
i.e. (x1,y1,z1).

Returns:
Edge: Part.Edge object

### `Part.makeLoft`

**Args:** `(...)`

makeLoft(list of wires,[solid=False,ruled=False,closed=False,maxDegree=5]) -- Create a loft shape.

### `Part.makeLongHelix`

**Args:** `(...)`

makeLongHelix(pitch,height,radius,[angle],[hand]) -- Make a (multi-edge) helix with a given pitch, height and radius
By default a cylindrical surface is used to create the helix. If the fourth parameter is set
(the apex given in degree) a conical surface is used instead.

### `Part.makePlane`

**Args:** `(...)`

makePlane(length,width,[pnt,dirZ,dirX]) -- Make a plane
By default pnt=Vector(0,0,0) and dirZ=Vector(0,0,1), dirX is ignored in this case

### `Part.makePolygon`

**Args:** `(...)`

makePolygon(pntslist) -- Make a polygon from a list of points

Args:
pntslist (list(Vector)): list of Vectors representing the 
points of the polygon.

Returns:
Wire: Part.Wire object. If the last point in the list is 
not the same as the first point, the Wire will not be 
closed and cannot be used to create a face.

### `Part.makeRevolution`

**Args:** `(...)`

makeRevolution(Curve or Edge,[vmin,vmax,angle,pnt,dir,shapetype]) -- Make a revolved shape
by rotating the curve or a portion of it around an axis given by (pnt,dir).
By default vmin/vmax=bounds of the curve, angle=360, pnt=Vector(0,0,0),
dir=Vector(0,0,1) and shapetype=Part.Solid

### `Part.makeRuledSurface`

**Args:** `(...)`

makeRuledSurface(Edge|Wire,Edge|Wire) -- Make a ruled surface
Create a ruled surface out of two edges or wires. If wires are used thenthese must have the same number of edges.

### `Part.makeShell`

**Args:** `(...)`

makeShell(list) -- Create a shell out of a list of faces.

### `Part.makeShellFromWires`

**Args:** `(...)`

makeShellFromWires(Wires) -- Make a shell from wires.
The wires must have the same number of edges.

### `Part.makeSolid`

**Args:** `(...)`

makeSolid(shape): Create a solid out of shells of shape. If shape is a compsolid, the overall volume solid is created.

### `Part.makeSphere`

**Args:** `(...)`

makeSphere(radius,[pnt, dir, angle1,angle2,angle3]) -- Make a sphere with a given radius
By default pnt=Vector(0,0,0), dir=Vector(0,0,1), angle1=0, angle2=90 and angle3=360

### `Part.makeSplitShape`

**Args:** `(...)`

makeSplitShape(shape, list of shape pairs,[check Interior=True]) -> two lists of shapes.
The following shape pairs are supported:
* Wire, Face
* Edge, Face
* Compound, Face
* Edge, Edge
* The face must be part of the specified shape and the edge, wire or compound must
lie on the face.
Output:
The first list contains the faces that are the left of the projected wires.
The second list contains the left part on the shape.

Example:
face = ...
edges = ...
split = [(edges[0],face),(edges[1],face)]
r = Part.makeSplitShape(face, split)
Part.show(r[0][0])
Part.show(r[1][0])

### `Part.makeSweepSurface`

**Args:** `(...)`

makeSweepSurface(edge(path),edge(profile),[float]) -- Create a profile along a path.

### `Part.makeThread`

**Args:** `(...)`

makeThread(pitch,depth,height,radius) -- Make a thread with a given pitch, depth, height and radius

### `Part.makeTorus`

**Args:** `(...)`

makeTorus(radius1,radius2,[pnt,dir,angle1,angle2,angle]) -- Make a torus with a given radii and angles
By default pnt=Vector(0,0,0),dir=Vector(0,0,1),angle1=0,angle1=360 and angle=360

### `Part.makeTube`

**Args:** `(...)`

makeTube(edge,radius,[continuity,max degree,max segments]) -- Create a tube.
continuity is a string which must be 'C0','C1','C2','C3','CN','G1' or 'G1',

### `Part.makeWedge`

**Args:** `(...)`

makeWedge(xmin, ymin, zmin, z2min, x2min,
xmax, ymax, zmax, z2max, x2max,[pnt,dir])
-- Make a wedge located in pnt
By default pnt=Vector(0,0,0) and dir=Vector(0,0,1)

### `Part.makeWireString`

**Args:** `(...)`

makeWireString(string,fontdir,fontfile,height,[track]) -- Make list of wires in the form of a string's characters.

### `Part.open`

**Args:** `(...)`

open(string) -- Create a new document and load the file into the document.

### `Part.read`

**Args:** `(...)`

read(string) -- Load the file and return the shape.

### `Part.setStaticValue`

**Args:** `(...)`

setStaticValue(string,string|int|float) -- Set a name to a value The value can be a string, int or float.

### `Part.show`

**Args:** `(...)`

show(shape,[string]) -- Add the shape to the active document or create one if no document exists.
Returns document object.

### `Part.sortEdges`

**Args:** `(...)`

sortEdges(list of edges, [tol3d]) -- list of lists of edges
It does basically the same as __sortEdges__ but sorts all input edges and thus returns
a list of lists of edges
optional 3D tolerance defaults to Precision::Confusion

### `Part.splitSubname`

**Args:** `(...)`

splitSubname(subname) -> list(sub,mapped,subElement)
Split the given subname into a list

sub: subname without any sub-element reference
mapped: mapped element name, or '' if none
subElement: old style element name, or '' if none

---

## Class reference

### `Arc`

**Inherits:** `TrimmedCurve`

**Properties**

| Name | Description |
|---|---|
| `EndPoint` | Returns the end point of the bounded curve. |
| `StartPoint` | Returns the starting point of the bounded curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Re-trims this curve to the provided parameter range ([Float=First, Float=Last])
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `ArcOfCircle`

**Inherits:** `ArcOfConic`

**Properties**

| Name | Description |
|---|---|
| `Circle` | The internal circle representation |
| `Radius` | The radius of the circle. |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the conic |
| `Center` | Deprecated -- use Location. |
| `Location` | Center of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `EndPoint` | Returns the end point of the bounded curve. |
| `StartPoint` | Returns the starting point of the bounded curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Re-trims this curve to the provided parameter range ([Float=First, Float=Last])
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `ArcOfConic`

**Inherits:** `TrimmedCurve`

**Properties**

| Name | Description |
|---|---|
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the conic |
| `Center` | Deprecated -- use Location. |
| `Location` | Center of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `EndPoint` | Returns the end point of the bounded curve. |
| `StartPoint` | Returns the starting point of the bounded curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Re-trims this curve to the provided parameter range ([Float=First, Float=Last])
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `ArcOfEllipse`

**Inherits:** `ArcOfConic`

**Properties**

| Name | Description |
|---|---|
| `Ellipse` | The internal ellipse representation |
| `MajorRadius` | The major radius of the ellipse. |
| `MinorRadius` | The minor radius of the ellipse. |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the conic |
| `Center` | Deprecated -- use Location. |
| `Location` | Center of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `EndPoint` | Returns the end point of the bounded curve. |
| `StartPoint` | Returns the starting point of the bounded curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Re-trims this curve to the provided parameter range ([Float=First, Float=Last])
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `ArcOfHyperbola`

**Inherits:** `ArcOfConic`

**Properties**

| Name | Description |
|---|---|
| `Hyperbola` | The internal hyperbola representation |
| `MajorRadius` | The major radius of the hyperbola. |
| `MinorRadius` | The minor radius of the hyperbola. |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the conic |
| `Center` | Deprecated -- use Location. |
| `Location` | Center of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `EndPoint` | Returns the end point of the bounded curve. |
| `StartPoint` | Returns the starting point of the bounded curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Re-trims this curve to the provided parameter range ([Float=First, Float=Last])
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `ArcOfParabola`

**Inherits:** `ArcOfConic`

**Properties**

| Name | Description |
|---|---|
| `Focal` | The focal length of the parabola. |
| `Parabola` | The internal parabola representation |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the conic |
| `Center` | Deprecated -- use Location. |
| `Location` | Center of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `EndPoint` | Returns the end point of the bounded curve. |
| `StartPoint` | Returns the starting point of the bounded curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Re-trims this curve to the provided parameter range ([Float=First, Float=Last])
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `AttachEngine`

**Inherits:** `Base.BaseClass`

**Properties**

| Name | Description |
|---|---|
| `AttacherType` | Type of engine: 3d, plane, line, or point. |
| `AttachmentOffset` | Current attachment mode. |
| `CompleteModeList` | List of all attachment modes of all AttachEngines. This is the list of modes in MapMode enum properties of AttachableObjects. |
| `CompleteRefTypeList` | List of all reference shape types recognized by AttachEngine. |
| `ImplementedModes` | List of all attachment modes of all AttachEngines. This is the list of modes in MapMode enum properties of AttachableObjects. |
| `Mode` | Current attachment mode. |
| `Parameter` | Value of parameter for some curve attachment modes. Range of 0..1 spans the length of the edge (parameter value can be outside of the range for curves that allow extrapolation. |
| `References` | Current attachment mode. |
| `Reverse` | If True, Z axis of attached placement is flipped. X axis is flipped in addition (CS has to remain right-handed). |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `calculateAttachedPlacement((...))` — calculateAttachedPlacement(orig_placement): returns result of attachment, based
- `copy((...))` — copy(): returns a new instance of AttachEngine.
- `downgradeRefType((...))` — downgradeRefType(type): returns next more general type. E.g. downgradeType('Circle') yields 'Curve'.
- `getModeInfo((...))` — getModeInfo(mode): returns supported reference combinations, user-friendly name, and so on.
- `getRefTypeInfo((...))` — getRefTypeInfo(type): returns information (dict) on shape type. Keys:'UserFriendlyName', 'TypeIndex', 'Rank'. Rank is the number of times reftype can be downgraded, before it becomes 'Any'.
- `getRefTypeOfShape((...))` — getRefTypeOfShape(shape): returns shape type as interpreted by AttachEngine. Returns a string.
- `isFittingRefType((...))` — isFittingRefType(type_shape, type_needed): tests if shape type, specified by type_shape (string), fits a type required by attachment mode type_needed (string). e.g. 'Circle' fits a requirement of 'Edge', and 'Curve' doesn't fit if a 'Circle' is required.
- `readParametersFromFeature((...))` — readParametersFromFeature(document_object): sets AttachEngine parameters (References, Mode, etc.) by reading out properties of AttachableObject-derived feature.
- `suggestModes((...))` — suggestModes(): runs mode suggestion routine and returns a dictionary with
- `writeParametersToFeature((...))` — writeParametersToFeature(document_object): updates properties of
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `BSplineCurve`

**Inherits:** `BoundedCurve`

**Properties**

| Name | Description |
|---|---|
| `Degree` | Returns the polynomial degree of this B-Spline curve. |
| `EndPoint` | Returns the end point of this B-Spline curve. |
| `FirstUKnotIndex` | Returns the index in the knot array of the knot |
| `KnotSequence` | Returns the knots sequence of this B-Spline curve. |
| `LastUKnotIndex` | Returns the index in the knot array of the knot |
| `MaxDegree` | Returns the value of the maximum polynomial degree of any |
| `NbKnots` | Returns the number of knots of this B-Spline curve. |
| `NbPoles` | Returns the number of poles of this B-Spline curve. |
| `StartPoint` | Returns the start point of this B-Spline curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximate((...))` — Replaces this B-Spline curve by approximating a set of points.
- `buildFromPoles((...))` — Builds a B-Spline by a list of poles.
- `buildFromPolesMultsKnots((...))` — Builds a B-Spline by a lists of Poles, Mults, Knots.
- `getCardinalSplineTangents((...))` — Compute the tangents for a Cardinal spline
- `getKnot((...))` — Get a knot of the B-Spline curve.
- `getKnots((...))` — Get all knots of the B-Spline curve.
- `getMultiplicities((...))` — Returns the multiplicities table M of the knots of this B-Spline curve.
- `getMultiplicity((...))` — Returns the multiplicity of the knot of index
- `getPole((...))` — Get a pole of the B-Spline curve.
- `getPoles((...))` — Get all poles of the B-Spline curve.
- `getPolesAndWeights((...))` — Returns the table of poles and weights in homogeneous coordinates.
- `getResolution((...))` — Computes for this B-Spline curve the parametric tolerance (UTolerance)
- `getWeight((...))` — Get a weight of the B-Spline curve.
- `getWeights((...))` — Get all weights of the B-Spline curve.
- `increaseDegree((...))` — increase(Int=Degree)
- `increaseMultiplicity((...))` — increaseMultiplicity(int index, int mult)
- `incrementMultiplicity((...))` — incrementMultiplicity(int start, int end, int mult)
- `insertKnot((...))` — insertKnot(u, mult = 1, tol = 0.0)
- `insertKnots((...))` — insertKnots(list_of_floats, list_of_ints, tol = 0.0, bool_add = True)
- `interpolate((...))` — Replaces this B-Spline curve by interpolating a set of points.
- `isClosed((...))` — Returns true if the distance between the start point and end point of
- `isPeriodic((...))` — Returns true if this BSpline curve is periodic.
- `isRational((...))` — Returns true if this B-Spline curve is rational.
- `join((...))` — Build a new spline by joining this and a second spline.
- `makeC1Continuous((...))` — makeC1Continuous(tol = 1e-6, ang_tol = 1e-7)
- `movePoint((...))` — movePoint(U, P, Index1, Index2)
- `removeKnot((...))` — removeKnot(Index, M, tol)
- `scaleKnotsToBounds((...))` — Scales the knots list to fit the specified bounds.
- `segment((...))` — segment(u1,u2)
- `setKnot((...))` — Set a knot of the B-Spline curve.
- `setKnots((...))` — Set knots of the B-Spline curve.
- `setNotPeriodic((...))` — Changes this B-Spline curve into a non-periodic curve.
- `setOrigin((...))` — Assigns the knot of index Index in the knots table
- `setPeriodic((...))` — Changes this B-Spline curve into a periodic curve.
- `setPole((...))` — Modifies this B-Spline curve by assigning P
- `setWeight((...))` — Set a weight of the B-Spline curve.
- `toBezier((...))` — Build a list of Bezier splines.
- `toBiArcs((...))` — Build a list of arcs and lines to approximate the B-spline.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `BSplineSurface`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `FirstUKnotIndex` | Returns the index in the knot array associated with the u parametric direction, |
| `FirstVKnotIndex` | Returns the index in the knot array associated with the v parametric direction, |
| `LastUKnotIndex` | Returns the index in the knot array associated with the u parametric direction, |
| `LastVKnotIndex` | Returns the index in the knot array associated with the v parametric direction, |
| `MaxDegree` | Returns the value of the maximum polynomial degree of any |
| `NbUKnots` | Returns the number of knots of this B-Spline surface in the u parametric direction. |
| `NbUPoles` | Returns the number of poles of this B-Spline surface in the u parametric direction. |
| `NbVKnots` | Returns the number of knots of this B-Spline surface in the v parametric direction. |
| `NbVPoles` | Returns the number of poles of this B-Spline surface in the v parametric direction. |
| `UDegree` | Returns the degree of this B-Spline surface in the u parametric direction. |
| `UKnotSequence` | Returns the knots sequence of this B-Spline surface in |
| `VDegree` | Returns the degree of this B-Spline surface in the v parametric direction. |
| `VKnotSequence` | Returns the knots sequence of this B-Spline surface in |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximate((...))` — Replaces this B-Spline surface by approximating a set of points.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this B-Spline surface.
- `buildFromNSections((...))` — Builds a B-Spline from a list of control curves
- `buildFromPolesMultsKnots((...))` — Builds a B-Spline by a lists of Poles, Mults and Knots
- `exchangeUV((...))` — Exchanges the u and v parametric directions on this B-Spline surface.
- `getPole((...))` — Returns the pole of index (UIndex,VIndex) of this B-Spline surface.
- `getPoles((...))` — Returns the table of poles of this B-Spline surface.
- `getPolesAndWeights((...))` — Returns the table of poles and weights in homogeneous coordinates.
- `getResolution((...))` — Computes two tolerance values for this B-Spline surface, based on the
- `getUKnot((...))` — Returns, for this B-Spline surface, in the u parametric direction
- `getUKnots((...))` — Returns, for this B-Spline surface, the knots table
- `getUMultiplicities((...))` — Returns, for this B-Spline surface, the table of
- `getUMultiplicity((...))` — Returns, for this B-Spline surface, the multiplicity of
- `getVKnot((...))` — Returns, for this B-Spline surface, in the v parametric direction
- `getVKnots((...))` — Returns, for this B-Spline surface, the knots table
- `getVMultiplicities((...))` — Returns, for this B-Spline surface, the table of
- `getVMultiplicity((...))` — Returns, for this B-Spline surface, the multiplicity of
- `getWeight((...))` — Return the weight of the pole of index (UIndex,VIndex)
- `getWeights((...))` — Returns the table of weights of the poles for this B-Spline surface.
- `increaseDegree((...))` — increase(Int=UDegree, int=VDegree)
- `increaseUMultiplicity((...))` — Increases the multiplicity in the u direction.
- `increaseVMultiplicity((...))` — Increases the multiplicity in the v direction.
- `incrementUMultiplicity((...))` — Increment the multiplicity in the u direction
- `incrementVMultiplicity((...))` — Increment the multiplicity in the v direction
- `insertUKnot((...))` — insertUKnote(float U, int Index, float Tolerance) - Insert or override a knot
- `insertUKnots((...))` — insertUKnote(List of float U, List of float Mult, float Tolerance) - Inserts knots.
- `insertVKnot((...))` — insertUKnote(float V, int Index, float Tolerance) - Insert or override a knot.
- `insertVKnots((...))` — insertUKnote(List of float V, List of float Mult, float Tolerance) - Inserts knots.
- `interpolate((...))` — interpolate(points)
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this surface is periodic in the u parametric direction.
- `isURational((...))` — Returns false if the equation of this B-Spline surface is polynomial
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this surface is periodic in the v parametric direction.
- `isVRational((...))` — Returns false if the equation of this B-Spline surface is polynomial
- `movePoint((...))` — Moves the point of parameters (U, V) of this B-Spline surface to P.
- `removeUKnot((...))` — Reduces to M the multiplicity of the knot of index Index in the given
- `removeVKnot((...))` — Reduces to M the multiplicity of the knot of index Index in the given
- `reparametrize((...))` — Returns a reparametrized copy of this surface
- `scaleKnotsToBounds((...))` — Scales the U and V knots lists to fit the specified bounds.
- `segment((...))` — Modifies this B-Spline surface by segmenting it between U1 and U2 in the
- `setPole((...))` — Modifies this B-Spline surface by assigning P to the pole of
- `setPoleCol((...))` — Modifies this B-Spline surface by assigning values to all or part
- `setPoleRow((...))` — Modifies this B-Spline surface by assigning values to all or part
- `setUKnot((...))` — Modifies this B-Spline surface by assigning the value K to the knot of index
- `setUKnots((...))` — Changes all knots of this B-Spline surface in the u parametric
- `setUNotPeriodic((...))` — Changes this B-Spline surface into a non-periodic one in the u parametric direction.
- `setUOrigin((...))` — Assigns the knot of index Index in the knots table
- `setUPeriodic((...))` — Modifies this surface to be periodic in the u parametric direction.
- `setVKnot((...))` — Modifies this B-Spline surface by assigning the value K to the knot of index
- `setVKnots((...))` — Changes all knots of this B-Spline surface in the v parametric
- `setVNotPeriodic((...))` — Changes this B-Spline surface into a non-periodic one in the v parametric direction.
- `setVOrigin((...))` — Assigns the knot of index Index in the knots table
- `setVPeriodic((...))` — Modifies this surface to be periodic in the v parametric direction.
- `setWeight((...))` — Modifies this B-Spline surface by assigning the value Weight to the weight
- `setWeightCol((...))` — Modifies this B-Spline surface by assigning values to all or part of the
- `setWeightRow((...))` — Modifies this B-Spline surface by assigning values to all or part of the
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `BezierCurve`

**Inherits:** `BoundedCurve`

**Properties**

| Name | Description |
|---|---|
| `Degree` | Returns the polynomial degree of this Bezier curve, |
| `EndPoint` | Returns the end point of this Bezier curve. |
| `MaxDegree` | Returns the value of the maximum polynomial degree of any |
| `NbPoles` | Returns the number of poles of this Bezier curve. |
| `StartPoint` | Returns the start point of this Bezier curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `getPole((...))` — Get a pole of the Bezier curve.
- `getPoles((...))` — Get all poles of the Bezier curve.
- `getResolution((...))` — Computes for this Bezier curve the parametric tolerance (UTolerance)
- `getWeight((...))` — Get a weight of the Bezier curve.
- `getWeights((...))` — Get all weights of the Bezier curve.
- `increase((...))` — Increases the degree of this Bezier curve to Degree.
- `insertPoleAfter((...))` — Inserts after the pole of index.
- `insertPoleBefore((...))` — Inserts before the pole of index.
- `interpolate((...))` — Interpolates a list of constraints.
- `isClosed((...))` — Returns true if the distance between the start point and end point of
- `isPeriodic((...))` — Returns false.
- `isRational((...))` — Returns false if the weights of all the poles of this Bezier curve are equal.
- `removePole((...))` — Removes the pole of index Index from the table of poles of this Bezier curve.
- `segment((...))` — Modifies this Bezier curve by segmenting it.
- `setPole((...))` — Set a pole of the Bezier curve.
- `setPoles((...))` — Set the poles of the Bezier curve.
- `setWeight((...))` — (id, weight) Set a weight of the Bezier curve.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `BezierSurface`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `MaxDegree` | Returns the value of the maximum polynomial degree of any |
| `NbUPoles` | Returns the number of poles in u direction of this Bezier surface. |
| `NbVPoles` | Returns the number of poles in v direction of this Bezier surface. |
| `UDegree` | Returns the polynomial degree in u direction of this Bezier surface, |
| `VDegree` | Returns the polynomial degree in v direction of this Bezier surface, |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this Bezier surface.
- `exchangeUV((...))` — Exchanges the u and v parametric directions on this Bezier surface.
- `getPole((...))` — Get a pole of index (UIndex, VIndex) of the Bezier surface.
- `getPoles((...))` — Get all poles of the Bezier surface.
- `getResolution((...))` — Computes two tolerance values for this Bezier surface, based on the
- `getWeight((...))` — Get a weight of the pole of index (UIndex, VIndex)
- `getWeights((...))` — Get all weights of the Bezier surface.
- `increase((...))` — increase(DegreeU: int, DegreeV: int)
- `insertPoleColAfter((...))` — Inserts into the table of poles of this surface, after the column
- `insertPoleColBefore((...))` — Inserts into the table of poles of this surface, before the column
- `insertPoleRowAfter((...))` — Inserts into the table of poles of this surface, after the row
- `insertPoleRowBefore((...))` — Inserts into the table of poles of this surface, before the row
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns false.
- `isURational((...))` — Returns false if the equation of this Bezier surface is polynomial
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns false.
- `isVRational((...))` — Returns false if the equation of this Bezier surface is polynomial
- `removePoleCol((...))` — removePoleRow(VIndex: int)
- `removePoleRow((...))` — removePoleRow(UIndex: int)
- `segment((...))` — segment(U1: double, U2: double, V1: double, V2: double)
- `setPole((...))` — Set a pole of the Bezier surface.
- `setPoleCol((...))` — Set the column of poles of the Bezier surface.
- `setPoleRow((...))` — Set the row of poles of the Bezier surface.
- `setWeight((...))` — Set the weight of pole of the index (UIndex, VIndex)
- `setWeightCol((...))` — Set the weights of the poles in the column of poles
- `setWeightRow((...))` — Set the weights of the poles in the row of poles
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `BodyBase`

**Inherits:** `Feature`

**Properties**

| Name | Description |
|---|---|
| `ElementMapVersion` | Element map version |
| `Document` | Return the document this object is part of |
| `FullName` | Return the document name and internal name of this object |
| `ID` | The unique identifier (among its document) of this object |
| `InList` | A list of all objects which link to this object. |
| `InListRecursive` | A list of all objects which link to this object recursively. |
| `MustExecute` | Check if the object must be recomputed |
| `Name` | Return the internal name of this object |
| `NoTouch` | Enable/disable no touch on any property change |
| `OldLabel` | Contains the old label before change |
| `OutList` | A list of all objects this object links to. |
| `OutListRecursive` | A list of all objects this object links to recursively. |
| `Parents` | A List of tuple(parent,subname) holding all parents to this object |
| `Removing` | Indicate if the object is being removed |
| `State` | State of the object in the document |
| `ViewObject` | If the GUI is loaded the associated view provider is returned |
| `PropertiesList` | A list of all property names. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `getElementHistory((...))` — getElementHistory(name,recursive=True,sameType=False,showName=False) - returns the element mapped name history
- `getGlobalPlacement((...))` — getGlobalPlacement() -> Base.Placement
- `getPaths((...))` — getPaths()
- `getPropertyNameOfGeometry((...))` — getPropertyNameOfGeometry() -> str or None
- `getPropertyOfGeometry((...))` — getPropertyOfGeometry() -> object or None
- `getGlobalPlacementOf((...))` — getGlobalPlacementOf(targetObj, rootObj, subname) -> Base.Placement
- `addProperty((...))` — addProperty(type: string, name: string, group="", doc="", attr=0, read_only=False, hidden=False, locked = False, enum_vals=[]) -- Add a generic property.
- `adjustRelativeLinks((...))` — adjustRelativeLinks(parent,recursive=True) -- auto correct potential cyclic dependencies
- `clearExpression((...))` — Clear the expression for a property
- `enforceRecompute((...))` — Mark the object for recompute
- `getElementMapVersion((...))` — getElementMapVersion(property_name): return element map version of a given geometry property
- `getLinkedObject((...))` — getLinkedObject(recursive=True, matrix=None, transform=True, depth=0)
- `getParent((...))` — Returns the group the object is in or None if it is not part of a group.
- `getParentGeoFeatureGroup((...))` — Returns the GeoFeatureGroup, and hence the local coordinate system, the object
- `getParentGroup((...))` — Returns the group the object is in or None if it is not part of a group.
- `getPathsByOutList((...))` — Get all paths from this object to another object following the OutList.
- `getPlacementOf((...))` — Return the placement of the sub-object relative to the link object.
- `getStatusString((...))` — Returns the status of the object as string.
- `getSubObject((...))` — getSubObject(subname, retType=0, matrix=None, transform=True, depth=0)
- `getSubObjectList((...))` — getSubObjectList(subname)
- `getSubObjects((...))` — getSubObjects(reason=0): Return subname reference of all sub-objects
- `hasChildElement((...))` — Return true to indicate the object having child elements
- `isAttachedToDocument((...))` — isAttachedToDocument() -> bool
- `isElementVisible((...))` — isElementVisible(element): Check if a child element is visible
- `isValid((...))` — Returns True if the object is valid, False otherwise
- `purgeTouched((...))` — Mark the object as unchanged
- `recompute((...))` — recompute(recursive=False): Recomputes this object
- `removeProperty((...))` — removeProperty(string) -- Remove a generic property.
- `resolve((...))` — resolve(subname) -- resolve the sub object
- `resolveSubElement((...))` — resolveSubElement(subname,append,type) -- resolve both new and old style sub element
- `setElementVisible((...))` — setElementVisible(element,visible): Set the visibility of a child element
- `setExpression((...))` — Register an expression for a property
- `supportedProperties((...))` — A list of supported property types
- `touch((...))` — Mark the object as changed (touched)
- `evalExpression((...))` — Evaluate an expression
- `addExtension((...))` — Adds an extension to the object. Requires the string identifier for the python extension as argument
- `hasExtension((...))` — Returns if this object has the specified extension
- `dumpPropertyContent((...))` — dumpPropertyContent(Property, Compression=3) -> bytearray
- `getDocumentationOfProperty((...))` — getDocumentationOfProperty(name) -> str
- `getEditorMode((...))` — getEditorMode(name) -> list
- `getEnumerationsOfProperty((...))` — getEnumerationsOfProperty(name) -> list or None
- `getGroupOfProperty((...))` — getGroupOfProperty(name) -> str
- `getPropertyByName((...))` — getPropertyByName(name, checkOwner=0) -> object or Tuple
- `getPropertyStatus((...))` — getPropertyStatus(name='') -> list
- `getPropertyTouchList((...))` — getPropertyTouchList(name) -> tuple
- `getTypeIdOfProperty((...))` — getTypeIdOfProperty(name) -> str
- `getTypeOfProperty((...))` — getTypeOfProperty(name) -> list
- `renameProperty((...))` — renameProperty(oldName, newName) -> None
- `restorePropertyContent((...))` — restorePropertyContent(name, obj) -> None
- `setDocumentationOfProperty((...))` — setDocumentationOfProperty(name, docstring) -> None
- `setEditorMode((...))` — setEditorMode(name, type) -> None
- `setGroupOfProperty((...))` — setGroupOfProperty(name, group) -> None
- `setPropertyStatus((...))` — setPropertyStatus(name, val) -> None
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Circle`

**Inherits:** `Conic`

**Properties**

| Name | Description |
|---|---|
| `Radius` | The radius of the circle. |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the circle |
| `Center` | Deprecated -- use Location. |
| `Eccentricity` | Returns the eccentricity value of the conic e. |
| `Location` | Location of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `CompSolid`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add((...))` — Add a solid to the compound.
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Compound`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add((...))` — Add a shape to the compound.
- `connectEdgesToWires((...))` — Build a compound of wires out of the edges of this compound.
- `setFaces((...))` — A shape is created from points and triangles and set to this object
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Cone`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `Apex` | Compute the apex of the cone. |
| `Axis` | The axis direction of the cone |
| `Center` | Center of the cone. |
| `Radius` | The radius of the cone. |
| `SemiAngle` | The semi-angle of the cone. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Conic`

**Inherits:** `Curve`

**Properties**

| Name | Description |
|---|---|
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the circle |
| `Center` | Deprecated -- use Location. |
| `Eccentricity` | Returns the eccentricity value of the conic e. |
| `Location` | Location of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Cylinder`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `Axis` | The axis direction of the cylinder |
| `Center` | Center of the cylinder. |
| `Radius` | The radius of the cylinder. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Edge`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `CenterOfMass` | Returns the center of mass of the current system. |
| `Closed` | Returns true if the edge is closed |
| `Continuity` | Returns the continuity |
| `Curve` | Returns the 3D curve of the edge |
| `Degenerated` | Returns true if the edge is degenerated |
| `FirstParameter` | Returns the start value of the range of the primary parameter |
| `LastParameter` | Returns the end value of the range of the primary parameter |
| `Length` | Returns the cartesian length of the curve |
| `Mass` | Returns the mass of the current system. |
| `MatrixOfInertia` | Returns the matrix of inertia. It is a symmetrical matrix. |
| `ParameterRange` | Returns a 2 tuple with the range of the primary parameter |
| `PrincipalProperties` | Computes the principal properties of inertia of the current system. |
| `StaticMoments` | Returns Ix, Iy, Iz, the static moments of inertia of the |
| `Tolerance` | Set or get the tolerance of the vertex |
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `centerOfCurvatureAt((...))` — Get the center of curvature at the given parameter [First|Last] if defined
- `countNodes((...))` — Returns the number of nodes of the 3D polygon of the edge.
- `curvatureAt((...))` — Get the curvature at the given parameter [First|Last] if defined
- `curveOnSurface((...))` — Returns the 2D curve, the surface, the placement and the parameter range of index idx.
- `derivative1At((...))` — Get the first derivative at the given parameter value along the Edge if it is defined
- `derivative2At((...))` — Get the second derivative at the given parameter value along the Edge if it is defined
- `derivative3At((...))` — Get the third derivative at the given parameter value along the Edge if it is defined
- `discretize((...))` — Discretizes the edge and returns a list of points.
- `firstVertex((...))` — Returns the Vertex of orientation FORWARD in this edge.
- `getParameterByLength((...))` — Get the value of the primary parameter at the given distance along the cartesian length of the edge.
- `isSeam((...))` — Checks whether the edge is a seam edge.
- `lastVertex((...))` — Returns the Vertex of orientation REVERSED in this edge.
- `normalAt((...))` — Get the normal direction at the given parameter value along the Edge if it is defined
- `parameterAt((...))` — Get the parameter at the given vertex if lying on the edge
- `parameters((...))` — Get the list of parameters of the tessellation of an edge.
- `split((...))` — Splits the edge at the given parameter values and builds a wire out of it
- `tangentAt((...))` — Get the tangent direction at the given primary parameter value along the Edge if it is defined
- `valueAt((...))` — Get the value of the cartesian parameter value at the given parameter value along the Edge
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Ellipse`

**Inherits:** `Conic`

**Properties**

| Name | Description |
|---|---|
| `Focal` | The focal distance of the ellipse. |
| `Focus1` | The first focus is on the positive side of the major axis of the ellipse. |
| `Focus2` | The second focus is on the negative side of the major axis of the ellipse. |
| `MajorRadius` | The major radius of the ellipse. |
| `MinorRadius` | The minor radius of the ellipse. |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the circle |
| `Center` | Deprecated -- use Location. |
| `Eccentricity` | Returns the eccentricity value of the conic e. |
| `Location` | Location of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Face`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `CenterOfMass` | Returns the center of mass of the current system. |
| `Mass` | Returns the mass of the current system. |
| `MatrixOfInertia` | Returns the matrix of inertia. It is a symmetrical matrix. |
| `OuterWire` | The outer wire of this face |
| `ParameterRange` | Returns a 4 tuple with the parameter range |
| `PrincipalProperties` | Computes the principal properties of inertia of the current system. |
| `StaticMoments` | Returns Ix, Iy, Iz, the static moments of inertia of the |
| `Surface` | Returns the geometric surface of the face |
| `Tolerance` | Set or get the tolerance of the vertex |
| `Wire` | The outer wire of this face |
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `addWire((...))` — Adds a wire to the face.
- `countNodes((...))` — Returns the number of nodes of the triangulation.
- `countTriangles((...))` — Returns the number of triangles of the triangulation.
- `curvatureAt((...))` — Get the curvature at the given parameter [0|Length] if defined
- `curveOnSurface((...))` — Returns the curve associated to the edge in the parametric space of the face.
- `cutHoles((...))` — Cut holes in the face.
- `derivative1At((...))` — Get the first derivative at the given parameter [0|Length] if defined
- `derivative2At((...))` — Vector = d2At(pos) - Get the second derivative at the given parameter [0|Length] if defined
- `getUVNodes((...))` — Get the list of (u,v) nodes of the tessellation
- `isPartOfDomain((...))` — Check if a given (u,v) pair is inside the domain of a face
- `makeEvolved((...))` — Profile along the spine
- `makeHalfSpace((...))` — Make a half-space solid by this face and a reference point.
- `makeOffset((...))` — Offset the face by a given amount.
- `normalAt((...))` — Get the normal vector at the given parameter [0|Length] if defined
- `tangentAt((...))` — Get the tangent in u and v isoparametric at the given point if defined
- `validate((...))` — Validate the face.
- `valueAt((...))` — Get the point at the given parameter [0|Length] if defined
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Feature`

**Inherits:** `App.GeoFeature`

**Properties**

| Name | Description |
|---|---|
| `ElementMapVersion` | Element map version |
| `Document` | Return the document this object is part of |
| `FullName` | Return the document name and internal name of this object |
| `ID` | The unique identifier (among its document) of this object |
| `InList` | A list of all objects which link to this object. |
| `InListRecursive` | A list of all objects which link to this object recursively. |
| `MustExecute` | Check if the object must be recomputed |
| `Name` | Return the internal name of this object |
| `NoTouch` | Enable/disable no touch on any property change |
| `OldLabel` | Contains the old label before change |
| `OutList` | A list of all objects this object links to. |
| `OutListRecursive` | A list of all objects this object links to recursively. |
| `Parents` | A List of tuple(parent,subname) holding all parents to this object |
| `Removing` | Indicate if the object is being removed |
| `State` | State of the object in the document |
| `ViewObject` | If the GUI is loaded the associated view provider is returned |
| `PropertiesList` | A list of all property names. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `getElementHistory((...))` — getElementHistory(name,recursive=True,sameType=False,showName=False) - returns the element mapped name history
- `getGlobalPlacement((...))` — getGlobalPlacement() -> Base.Placement
- `getPaths((...))` — getPaths()
- `getPropertyNameOfGeometry((...))` — getPropertyNameOfGeometry() -> str or None
- `getPropertyOfGeometry((...))` — getPropertyOfGeometry() -> object or None
- `getGlobalPlacementOf((...))` — getGlobalPlacementOf(targetObj, rootObj, subname) -> Base.Placement
- `addProperty((...))` — addProperty(type: string, name: string, group="", doc="", attr=0, read_only=False, hidden=False, locked = False, enum_vals=[]) -- Add a generic property.
- `adjustRelativeLinks((...))` — adjustRelativeLinks(parent,recursive=True) -- auto correct potential cyclic dependencies
- `clearExpression((...))` — Clear the expression for a property
- `enforceRecompute((...))` — Mark the object for recompute
- `getElementMapVersion((...))` — getElementMapVersion(property_name): return element map version of a given geometry property
- `getLinkedObject((...))` — getLinkedObject(recursive=True, matrix=None, transform=True, depth=0)
- `getParent((...))` — Returns the group the object is in or None if it is not part of a group.
- `getParentGeoFeatureGroup((...))` — Returns the GeoFeatureGroup, and hence the local coordinate system, the object
- `getParentGroup((...))` — Returns the group the object is in or None if it is not part of a group.
- `getPathsByOutList((...))` — Get all paths from this object to another object following the OutList.
- `getPlacementOf((...))` — Return the placement of the sub-object relative to the link object.
- `getStatusString((...))` — Returns the status of the object as string.
- `getSubObject((...))` — getSubObject(subname, retType=0, matrix=None, transform=True, depth=0)
- `getSubObjectList((...))` — getSubObjectList(subname)
- `getSubObjects((...))` — getSubObjects(reason=0): Return subname reference of all sub-objects
- `hasChildElement((...))` — Return true to indicate the object having child elements
- `isAttachedToDocument((...))` — isAttachedToDocument() -> bool
- `isElementVisible((...))` — isElementVisible(element): Check if a child element is visible
- `isValid((...))` — Returns True if the object is valid, False otherwise
- `purgeTouched((...))` — Mark the object as unchanged
- `recompute((...))` — recompute(recursive=False): Recomputes this object
- `removeProperty((...))` — removeProperty(string) -- Remove a generic property.
- `resolve((...))` — resolve(subname) -- resolve the sub object
- `resolveSubElement((...))` — resolveSubElement(subname,append,type) -- resolve both new and old style sub element
- `setElementVisible((...))` — setElementVisible(element,visible): Set the visibility of a child element
- `setExpression((...))` — Register an expression for a property
- `supportedProperties((...))` — A list of supported property types
- `touch((...))` — Mark the object as changed (touched)
- `evalExpression((...))` — Evaluate an expression
- `addExtension((...))` — Adds an extension to the object. Requires the string identifier for the python extension as argument
- `hasExtension((...))` — Returns if this object has the specified extension
- `dumpPropertyContent((...))` — dumpPropertyContent(Property, Compression=3) -> bytearray
- `getDocumentationOfProperty((...))` — getDocumentationOfProperty(name) -> str
- `getEditorMode((...))` — getEditorMode(name) -> list
- `getEnumerationsOfProperty((...))` — getEnumerationsOfProperty(name) -> list or None
- `getGroupOfProperty((...))` — getGroupOfProperty(name) -> str
- `getPropertyByName((...))` — getPropertyByName(name, checkOwner=0) -> object or Tuple
- `getPropertyStatus((...))` — getPropertyStatus(name='') -> list
- `getPropertyTouchList((...))` — getPropertyTouchList(name) -> tuple
- `getTypeIdOfProperty((...))` — getTypeIdOfProperty(name) -> str
- `getTypeOfProperty((...))` — getTypeOfProperty(name) -> list
- `renameProperty((...))` — renameProperty(oldName, newName) -> None
- `restorePropertyContent((...))` — restorePropertyContent(name, obj) -> None
- `setDocumentationOfProperty((...))` — setDocumentationOfProperty(name, docstring) -> None
- `setEditorMode((...))` — setEditorMode(name, type) -> None
- `setGroupOfProperty((...))` — setGroupOfProperty(name, group) -> None
- `setPropertyStatus((...))` — setPropertyStatus(name, val) -> None
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `GeometryBoolExtension`

**Inherits:** `GeometryExtension`

**Properties**

| Name | Description |
|---|---|
| `Value` | Returns the value of the GeometryBoolExtension. |
| `Name` | Sets/returns the name of this extension. |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `copy((...))` — Create a copy of this geometry extension.

---

### `GeometryDoubleExtension`

**Inherits:** `GeometryExtension`

**Properties**

| Name | Description |
|---|---|
| `Value` | Returns the value of the GeometryDoubleExtension. |
| `Name` | Sets/returns the name of this extension. |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `copy((...))` — Create a copy of this geometry extension.

---

### `GeometryIntExtension`

**Inherits:** `GeometryExtension`

**Properties**

| Name | Description |
|---|---|
| `Value` | returns the value of the GeometryIntExtension. |
| `Name` | Sets/returns the name of this extension. |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `copy((...))` — Create a copy of this geometry extension.

---

### `GeometryStringExtension`

**Inherits:** `GeometryExtension`

**Properties**

| Name | Description |
|---|---|
| `Value` | returns the value of the GeometryStringExtension. |
| `Name` | Sets/returns the name of this extension. |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `copy((...))` — Create a copy of this geometry extension.

---

### `Hyperbola`

**Inherits:** `Conic`

**Properties**

| Name | Description |
|---|---|
| `Focal` | The focal distance of the hyperbola. |
| `Focus1` | The first focus is on the positive side of the major axis of the hyperbola. |
| `Focus2` | The second focus is on the negative side of the major axis of the hyperbola. |
| `MajorRadius` | The major radius of the hyperbola. |
| `MinorRadius` | The minor radius of the hyperbola. |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the circle |
| `Center` | Deprecated -- use Location. |
| `Eccentricity` | Returns the eccentricity value of the conic e. |
| `Location` | Location of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Line`

**Inherits:** `Curve`

**Properties**

| Name | Description |
|---|---|
| `Direction` | Returns the direction of this line. |
| `Location` | Returns the location of this line. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `LineSegment`

**Inherits:** `TrimmedCurve`

**Properties**

| Name | Description |
|---|---|
| `EndPoint` | Returns the end point point of this line. |
| `StartPoint` | Returns the start point of this line. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setParameterRange((...))` — Set the parameter range of the underlying line geometry
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `OCCConstructionError`

**Inherits:** `OCCDomainError`

**Properties**

| Name | Description |
|---|---|
| `__weakref__` | list of weak references to the object |
| `__cause__` | exception cause |
| `__context__` | exception context |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add_note((...))` — Exception.add_note(note) --
- `with_traceback((...))` — Exception.with_traceback(tb) --

---

### `OCCDimensionError`

**Inherits:** `OCCDomainError`

**Properties**

| Name | Description |
|---|---|
| `__weakref__` | list of weak references to the object |
| `__cause__` | exception cause |
| `__context__` | exception context |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add_note((...))` — Exception.add_note(note) --
- `with_traceback((...))` — Exception.with_traceback(tb) --

---

### `OCCDomainError`

**Inherits:** `OCCError`

**Properties**

| Name | Description |
|---|---|
| `__weakref__` | list of weak references to the object |
| `__cause__` | exception cause |
| `__context__` | exception context |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add_note((...))` — Exception.add_note(note) --
- `with_traceback((...))` — Exception.with_traceback(tb) --

---

### `OCCError`

**Inherits:** `Base.FreeCADError`

**Properties**

| Name | Description |
|---|---|
| `__weakref__` | list of weak references to the object |
| `__cause__` | exception cause |
| `__context__` | exception context |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add_note((...))` — Exception.add_note(note) --
- `with_traceback((...))` — Exception.with_traceback(tb) --

---

### `OCCRangeError`

**Inherits:** `OCCDomainError`

**Properties**

| Name | Description |
|---|---|
| `__weakref__` | list of weak references to the object |
| `__cause__` | exception cause |
| `__context__` | exception context |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add_note((...))` — Exception.add_note(note) --
- `with_traceback((...))` — Exception.with_traceback(tb) --

---

### `OffsetCurve`

**Inherits:** `Curve`

**Properties**

| Name | Description |
|---|---|
| `BasisCurve` | Sets or gets the basic curve. |
| `OffsetDirection` | Sets or gets the offset direction to offset the underlying curve. |
| `OffsetValue` | Sets or gets the offset value to offset the underlying curve. |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `OffsetSurface`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `BasisSurface` | Sets or gets the basic surface. |
| `OffsetValue` | Sets or gets the offset value to offset the underlying surface. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Parabola`

**Inherits:** `Conic`

**Properties**

| Name | Description |
|---|---|
| `Focal` | The focal distance is the distance between |
| `Focus` | The focus is on the positive side of the |
| `Parameter` | Compute the parameter of this parabola |
| `AngleXU` | The angle between the X axis and the major axis of the conic. |
| `Axis` | The axis direction of the circle |
| `Center` | Deprecated -- use Location. |
| `Eccentricity` | Returns the eccentricity value of the conic e. |
| `Location` | Location of the conic. |
| `XAxis` | The X axis direction of the circle |
| `YAxis` | The Y axis direction of the circle |
| `Continuity` | Returns the global continuity of the curve. |
| `FirstParameter` | Returns the value of the first parameter. |
| `LastParameter` | Returns the value of the last parameter. |
| `Rotation` | Returns a rotation object to describe the orientation for curve that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `compute((...))` — compute(p1,p2,p3) -> None
- `approximateBSpline((...))` — Approximates a curve of any type to a B-Spline curve.
- `centerOfCurvature((...))` — Vector = centerOfCurvature(float pos) - Get the center of curvature at the given parameter [First|Last] if defined
- `continuityWith((...))` — Computes the continuity of two curves
- `curvature((...))` — Float = curvature(pos) - Get the curvature at the given parameter [First|Last] if defined
- `discretize((...))` — Discretizes the curve and returns a list of points.
- `getD0((...))` — Returns the point of given parameter
- `getD1((...))` — Returns the point and first derivative of given parameter
- `getD2((...))` — Returns the point, first and second derivatives
- `getD3((...))` — Returns the point, first, second and third derivatives
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points and curve segments between the curve and the curve/surface.
- `intersect2d((...))` — Get intersection points with another curve lying on a plane.
- `intersectCC((...))` — Returns all intersection points between this curve and the given curve.
- `intersectCS((...))` — Returns all intersection points and curve segments between the curve and the surface.
- `isClosed((...))` — Returns true if the curve is closed.
- `isPeriodic((...))` — Returns true if this curve is periodic.
- `length((...))` — Computes the length of a curve
- `makeRuledSurface((...))` — Make a ruled surface of this and the given curves
- `normal((...))` — Vector = normal(pos) - Get the normal vector at the given parameter [First|Last] if defined
- `parameter((...))` — Returns the parameter on the curve of the nearest orthogonal projection of the point.
- `parameterAtDistance((...))` — Returns the parameter on the curve of a point at the given distance from a starting parameter.
- `period((...))` — Returns the period of this curve or raises an exception if it is not periodic.
- `projectPoint((...))` — Computes the projection of a point on the curve
- `reverse((...))` — Changes the direction of parametrization of the curve.
- `reversedParameter((...))` — Returns the parameter on the reversed curve for the point of parameter U on this curve.
- `tangent((...))` — Computes the tangent of parameter u on this curve
- `toBSpline((...))` — Converts a curve of any type (only part from First to Last) to BSpline curve.
- `toNurbs((...))` — Converts a curve of any type (only part from First to Last) to NURBS curve.
- `toShape((...))` — Return the shape for the geometry.
- `trim((...))` — Returns a trimmed curve defined in the given parameter range.
- `value((...))` — Computes the point of parameter u on this curve
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Part2DObject`

**Inherits:** `Feature`

**Properties**

| Name | Description |
|---|---|
| `ElementMapVersion` | Element map version |
| `Document` | Return the document this object is part of |
| `FullName` | Return the document name and internal name of this object |
| `ID` | The unique identifier (among its document) of this object |
| `InList` | A list of all objects which link to this object. |
| `InListRecursive` | A list of all objects which link to this object recursively. |
| `MustExecute` | Check if the object must be recomputed |
| `Name` | Return the internal name of this object |
| `NoTouch` | Enable/disable no touch on any property change |
| `OldLabel` | Contains the old label before change |
| `OutList` | A list of all objects this object links to. |
| `OutListRecursive` | A list of all objects this object links to recursively. |
| `Parents` | A List of tuple(parent,subname) holding all parents to this object |
| `Removing` | Indicate if the object is being removed |
| `State` | State of the object in the document |
| `ViewObject` | If the GUI is loaded the associated view provider is returned |
| `PropertiesList` | A list of all property names. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `getElementHistory((...))` — getElementHistory(name,recursive=True,sameType=False,showName=False) - returns the element mapped name history
- `getGlobalPlacement((...))` — getGlobalPlacement() -> Base.Placement
- `getPaths((...))` — getPaths()
- `getPropertyNameOfGeometry((...))` — getPropertyNameOfGeometry() -> str or None
- `getPropertyOfGeometry((...))` — getPropertyOfGeometry() -> object or None
- `getGlobalPlacementOf((...))` — getGlobalPlacementOf(targetObj, rootObj, subname) -> Base.Placement
- `addProperty((...))` — addProperty(type: string, name: string, group="", doc="", attr=0, read_only=False, hidden=False, locked = False, enum_vals=[]) -- Add a generic property.
- `adjustRelativeLinks((...))` — adjustRelativeLinks(parent,recursive=True) -- auto correct potential cyclic dependencies
- `clearExpression((...))` — Clear the expression for a property
- `enforceRecompute((...))` — Mark the object for recompute
- `getElementMapVersion((...))` — getElementMapVersion(property_name): return element map version of a given geometry property
- `getLinkedObject((...))` — getLinkedObject(recursive=True, matrix=None, transform=True, depth=0)
- `getParent((...))` — Returns the group the object is in or None if it is not part of a group.
- `getParentGeoFeatureGroup((...))` — Returns the GeoFeatureGroup, and hence the local coordinate system, the object
- `getParentGroup((...))` — Returns the group the object is in or None if it is not part of a group.
- `getPathsByOutList((...))` — Get all paths from this object to another object following the OutList.
- `getPlacementOf((...))` — Return the placement of the sub-object relative to the link object.
- `getStatusString((...))` — Returns the status of the object as string.
- `getSubObject((...))` — getSubObject(subname, retType=0, matrix=None, transform=True, depth=0)
- `getSubObjectList((...))` — getSubObjectList(subname)
- `getSubObjects((...))` — getSubObjects(reason=0): Return subname reference of all sub-objects
- `hasChildElement((...))` — Return true to indicate the object having child elements
- `isAttachedToDocument((...))` — isAttachedToDocument() -> bool
- `isElementVisible((...))` — isElementVisible(element): Check if a child element is visible
- `isValid((...))` — Returns True if the object is valid, False otherwise
- `purgeTouched((...))` — Mark the object as unchanged
- `recompute((...))` — recompute(recursive=False): Recomputes this object
- `removeProperty((...))` — removeProperty(string) -- Remove a generic property.
- `resolve((...))` — resolve(subname) -- resolve the sub object
- `resolveSubElement((...))` — resolveSubElement(subname,append,type) -- resolve both new and old style sub element
- `setElementVisible((...))` — setElementVisible(element,visible): Set the visibility of a child element
- `setExpression((...))` — Register an expression for a property
- `supportedProperties((...))` — A list of supported property types
- `touch((...))` — Mark the object as changed (touched)
- `evalExpression((...))` — Evaluate an expression
- `addExtension((...))` — Adds an extension to the object. Requires the string identifier for the python extension as argument
- `hasExtension((...))` — Returns if this object has the specified extension
- `dumpPropertyContent((...))` — dumpPropertyContent(Property, Compression=3) -> bytearray
- `getDocumentationOfProperty((...))` — getDocumentationOfProperty(name) -> str
- `getEditorMode((...))` — getEditorMode(name) -> list
- `getEnumerationsOfProperty((...))` — getEnumerationsOfProperty(name) -> list or None
- `getGroupOfProperty((...))` — getGroupOfProperty(name) -> str
- `getPropertyByName((...))` — getPropertyByName(name, checkOwner=0) -> object or Tuple
- `getPropertyStatus((...))` — getPropertyStatus(name='') -> list
- `getPropertyTouchList((...))` — getPropertyTouchList(name) -> tuple
- `getTypeIdOfProperty((...))` — getTypeIdOfProperty(name) -> str
- `getTypeOfProperty((...))` — getTypeOfProperty(name) -> list
- `renameProperty((...))` — renameProperty(oldName, newName) -> None
- `restorePropertyContent((...))` — restorePropertyContent(name, obj) -> None
- `setDocumentationOfProperty((...))` — setDocumentationOfProperty(name, docstring) -> None
- `setEditorMode((...))` — setEditorMode(name, type) -> None
- `setGroupOfProperty((...))` — setGroupOfProperty(name, group) -> None
- `setPropertyStatus((...))` — setPropertyStatus(name, val) -> None
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Plane`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `Axis` | Returns the axis of this plane. |
| `Position` | Returns the position point of this plane. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `PlateSurface`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `makeApprox((...))` — Approximate the plate surface to a B-Spline surface
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Point`

**Inherits:** `Geometry`

**Properties**

| Name | Description |
|---|---|
| `X` | X component of this point. |
| `Y` | Y component of this point. |
| `Z` | Z component of this point. |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `toShape((...))` — Create a vertex from this point.
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Precision`

**Inherits:** `builtins.PyObjectBase`

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `angular((...))` — Returns the recommended precision value when checking the equality of two angles (given in radians)
- `approximation((...))` — Returns the precision value in real space, frequently used by approximation algorithms
- `confusion((...))` — Returns the recommended precision value when checking coincidence of two points in real space
- `infinite((...))` — Returns a big number that can be considered as infinite
- `intersection((...))` — Returns the precision value in real space, frequently used by intersection algorithms
- `isInfinite((...))` — Returns True if R may be considered as an infinite number
- `isNegativeInfinite((...))` — Returns True if R may be considered as a negative infinite number
- `isPositiveInfinite((...))` — Returns True if R may be considered as a positive infinite number
- `parametric((...))` — Convert a real space precision to a parametric space precision
- `squareConfusion((...))` — Returns square of confusion

---

### `RectangularTrimmedSurface`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `BasisSurface` | Represents the basis surface from which the trimmed surface is derived. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `setTrim((...))` — setTrim(self, params: (u1, u2, v1, v2)) -> None
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Shape`

**Inherits:** `Data.ComplexGeoData`

**Properties**

| Name | Description |
|---|---|
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Shell`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `CenterOfMass` | Returns the center of mass of the current system. |
| `Mass` | Returns the mass of the current system. |
| `MatrixOfInertia` | Returns the matrix of inertia. It is a symmetrical matrix. |
| `PrincipalProperties` | Computes the principal properties of inertia of the current system. |
| `StaticMoments` | Returns Ix, Iy, Iz, the static moments of inertia of the |
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add((...))` — Add a face to the shell.
- `getBadEdges((...))` — Get bad edges as compound.
- `getFreeEdges((...))` — Get free edges as compound.
- `makeHalfSpace((...))` — Make a half-space solid by this shell and a reference point.
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Solid`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `CenterOfMass` | Returns the center of mass of the current system. |
| `Mass` | Returns the mass of the current system. |
| `MatrixOfInertia` | Returns the matrix of inertia. It is a symmetrical matrix. |
| `OuterShell` | Returns the outer most shell of this solid or an null |
| `PrincipalProperties` | Computes the principal properties of inertia of the current system. |
| `StaticMoments` | Returns Ix, Iy, Iz, the static moments of inertia of the |
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `getMomentOfInertia((...))` — computes the moment of inertia of the material system about the axis A.
- `getRadiusOfGyration((...))` — Returns the radius of gyration of the current system about the axis A.
- `offsetFaces((...))` — Extrude single faces of the solid.
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Sphere`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `Area` | Compute the area of the sphere. |
| `Axis` | The axis direction of the circle |
| `Center` | Center of the sphere. |
| `Radius` | The radius of the sphere. |
| `Volume` | Compute the volume of the sphere. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `SurfaceOfExtrusion`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `BasisCurve` | Sets or gets the basic curve. |
| `Direction` | Sets or gets the direction of revolution. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `SurfaceOfRevolution`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `BasisCurve` | Sets or gets the basic curve. |
| `Direction` | Sets or gets the direction of revolution. |
| `Location` | Sets or gets the location of revolution. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Toroid`

**Inherits:** `GeometrySurface`

**Properties**

| Name | Description |
|---|---|
| `Area` | Compute the area of the toroid. |
| `Axis` | The axis direction of the toroid |
| `Center` | Center of the toroid. |
| `MajorRadius` | The major radius of the toroid. |
| `MinorRadius` | The minor radius of the toroid. |
| `Volume` | Compute the volume of the toroid. |
| `Continuity` | Returns the global continuity of the surface. |
| `Rotation` | Returns a rotation object to describe the orientation for surface that supports it |
| `Tag` | Gives the tag of the geometry as string. |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `UPeriod((...))` — Returns the period of this patch in the u parametric direction.
- `VPeriod((...))` — Returns the period of this patch in the v parametric direction.
- `bounds((...))` — Returns the parametric bounds (U1, U2, V1, V2) of this trimmed surface.
- `curvature((...))` — curvature(u,v,type) -> float
- `curvatureDirections((...))` — curvatureDirections(u,v) -> (Vector,Vector)
- `getD0((...))` — Returns the point of given parameter
- `getDN((...))` — Returns the n-th derivative
- `intersect((...))` — Returns all intersection points/curves between the surface and the curve/surface.
- `intersectSS((...))` — Returns all intersection curves of this surface and the given surface.
- `isPlanar((...))` — isPlanar([float]) -> Bool
- `isUClosed((...))` — Checks if this surface is closed in the u parametric direction.
- `isUPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `isUmbillic((...))` — isUmbillic(u,v) -> bool
- `isVClosed((...))` — Checks if this surface is closed in the v parametric direction.
- `isVPeriodic((...))` — Returns true if this patch is periodic in the given parametric direction.
- `normal((...))` — normal(u,v) -> Vector
- `parameter((...))` — Returns the parameter on the curve
- `projectPoint((...))` — Computes the projection of a point on the surface
- `tangent((...))` — tangent(u,v) -> (Vector,Vector)
- `toBSpline((...))` — Returns a B-Spline representation of this surface.
- `toShape((...))` — Return the shape for the geometry.
- `toShell((...))` — Make a shell of the surface.
- `uIso((...))` — Builds the U isoparametric curve
- `vIso((...))` — Builds the V isoparametric curve
- `value((...))` — value(u,v) -> Point
- `clone((...))` — Create a clone of this geometry with the same Tag
- `copy((...))` — Create a copy of this geometry
- `deleteExtensionOfName((...))` — Deletes all extensions of the indicated name.
- `deleteExtensionOfType((...))` — Deletes all extensions of the indicated type.
- `getExtensionOfName((...))` — Gets the first geometry extension of the name indicated by the string.
- `getExtensionOfType((...))` — Gets the first geometry extension of the type indicated by the string.
- `getExtensions((...))` — Returns a list with information about the geometry extensions.
- `hasExtensionOfName((...))` — Returns a boolean indicating whether a geometry extension with the name indicated as a string exists.
- `hasExtensionOfType((...))` — Returns a boolean indicating whether a geometry extension of the type indicated as a string exists.
- `isSame((...))` — isSame(geom, tol, angulartol) -> boolean
- `mirror((...))` — Performs the symmetrical transformation of this geometric object
- `rotate((...))` — Rotates this geometric object at angle Ang (in radians) about axis
- `scale((...))` — Applies a scaling transformation on this geometric object with a center and scaling factor
- `setExtension((...))` — Sets a geometry extension of the indicated type.
- `transform((...))` — Applies a transformation to this geometric object
- `translate((...))` — Translates this geometric object
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Vertex`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `Point` | Position of this Vertex as a Vector |
| `Tolerance` | Set or get the tolerance of the vertex |
| `X` | X component of this Vertex. |
| `Y` | Y component of this Vertex. |
| `Z` | Z component of this Vertex. |
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeEvolved((...))` — Profile along the spine
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---

### `Wire`

**Inherits:** `Shape`

**Properties**

| Name | Description |
|---|---|
| `CenterOfMass` | Returns the center of mass of the current system. |
| `Continuity` | Returns the continuity |
| `Mass` | Returns the mass of the current system. |
| `MatrixOfInertia` | Returns the matrix of inertia. It is a symmetrical matrix. |
| `OrderedEdges` | List of ordered edges in this shape. |
| `OrderedVertexes` | List of ordered vertexes in this shape. |
| `PrincipalProperties` | Computes the principal properties of inertia of the current system. |
| `StaticMoments` | Returns Ix, Iy, Iz, the static moments of inertia of the |
| `Area` | Total area of the faces of the shape. |
| `CompSolids` | List of subsequent shapes in this shape. |
| `Compounds` | List of compounds in this shape. |
| `Edges` | List of Edges in this shape. |
| `Faces` | List of faces in this shape. |
| `Length` | Total length of the edges of the shape. |
| `Orientation` | Returns the orientation of the shape. |
| `ShapeType` | Returns the type of the shape. |
| `Shells` | List of subsequent shapes in this shape. |
| `Solids` | List of subsequent shapes in this shape. |
| `SubShapes` | List of sub-shapes in this shape. |
| `Vertexes` | List of vertexes in this shape. |
| `Volume` | Total volume of the solids of the shape. |
| `Wires` | List of wires in this shape. |
| `BoundBox` | Get the bounding box (BoundBox) of the complex geometric data. |
| `CenterOfGravity` | Get the center of gravity |
| `ElementMap` | Get/Set a dict of element mapping |
| `ElementMapSize` | Get the current element map size |
| `ElementMapVersion` | Element map version |
| `ElementReverseMap` | Get a dict of element reverse mapping |
| `Hasher` | Get/Set the string hasher of this object |
| `Placement` | Get the current transformation of the object as placement |
| `Tag` | Geometry Tag |
| `Content` | Content of the object in XML representation. |
| `MemSize` | Memory size of the object in bytes. |
| `Module` | Module in which this class is defined |
| `TypeId` | Is the type of the FreeCAD object with module domain |

**Methods**

- `__init__((self, /, *args, **kwargs))` — Initialize self. See help(type(self)) for accurate signature.
- `add((...))` — Add an edge to the wire
- `approximate((...))` — Approximate B-Spline-curve from this wire
- `discretize((...))` — Discretizes the wire and returns a list of points.
- `fixWire((...))` — Fix wire
- `makeEvolved((...))` — Profile along the spine
- `makeHomogenousWires((...))` — Make this and the given wire homogeneous to have the same number of edges
- `makeOffset((...))` — Offset the shape by a given amount. DEPRECATED - use makeOffset2D instead.
- `makePipe((...))` — Make a pipe by sweeping along a wire.
- `makePipeShell((...))` — Make a loft defined by a list of profiles along a wire.
- `ancestorsOfType((...))` — For a sub-shape of this shape get its ancestors of a type.
- `check((...))` — Checks the shape and report errors in the shape structure.
- `childShapes((...))` — Return a list of sub-shapes that are direct children of this shape.
- `cleaned((...))` — This creates a cleaned copy of the shape with the triangulation removed.
- `clearCache((...))` — Clear internal sub-shape cache
- `common((...))` — Intersection of this and a given (list of) topo shape.
- `complement((...))` — Computes the complement of the orientation of this shape,
- `copy((...))` — Create a copy of this shape
- `countElement((...))` — Returns the count of a type of element
- `cut((...))` — Difference of this and a given (list of) topo shape
- `defeaturing((...))` — Remove a feature defined by supplied faces and return a new shape.
- `distToShape((...))` — Find the minimum distance to another shape.
- `dumpToString((...))` — Dump information about the shape to a string.
- `dumps((...))` — Serialize the content of this shape to a string in BREP format.
- `exportBinary((...))` — Export the content of this shape in binary format to a file.
- `exportBrep((...))` — Export the content of this shape to an BREP file.
- `exportBrepToString((...))` — Export the content of this shape to a string in BREP format.
- `exportIges((...))` — Export the content of this shape to an IGES file.
- `exportStep((...))` — Export the content of this shape to an STEP file.
- `exportStl((...))` — Export the content of this shape to an STL mesh file.
- `extrude((...))` — Extrude the shape along a vector.
- `findPlane((...))` — Returns a plane if the shape is planar
- `findSubShape((...))` — findSubShape(shape) -> (type_name, index)
- `findSubShapesWithSharedVertex((...))` — findSubShapesWithSharedVertex(shape, needName=False, checkGeometry=True, tol=1e-7, atol=1e-12) -> Shape
- `fix((...))` — Tries to fix a broken shape.
- `fixTolerance((...))` — Sets (enforces) tolerances in a shape to the given value
- `fuse((...))` — Union of this and a given (list of) topo shape.
- `generalFuse((...))` — Run general fuse algorithm (GFA) between this and given shapes.
- `getChildShapes((...))` — getChildShapes(shapetype, avoidtype='') -> list(Shape)
- `getElement((...))` — Returns a SubElement
- `getElementHistory((...))` — getElementHistory(name) - returns the element mapped name history
- `getTolerance((...))` — Determines a tolerance from the ones stored in a shape
- `globalTolerance((...))` — Returns the computed tolerance according to the mode
- `hashCode((...))` — This value is computed from the value of the underlying shape reference and the location.
- `importBinary((...))` — Import the content to this shape of a string in BREP format.
- `importBrep((...))` — Load the shape from a file in BREP format.
- `importBrepFromString((...))` — Load the shape from a string that keeps the content in BREP format.
- `inTolerance((...))` — Determines which shapes have a tolerance within a given interval
- `isClosed((...))` — Checks if the shape is closed.
- `isCoplanar((...))` — Checks if this shape is coplanar with the given shape.
- `isEqual((...))` — Checks if both shapes are equal.
- `isInfinite((...))` — Checks if this shape has an infinite expansion.
- `isInside((...))` — Checks whether a point is inside or outside the shape.
- `isNull((...))` — Checks if the shape is null.
- `isPartner((...))` — Checks if both shapes share the same geometry.
- `isSame((...))` — Checks if both shapes share the same geometry
- `isValid((...))` — Checks if the shape is valid, i.e. neither null, nor empty nor corrupted.
- `limitTolerance((...))` — Limits tolerances in a shape
- `loads((...))` — Deserialize the content of this shape from a string in BREP format.
- `makeChamfer((...))` — Make chamfer.
- `makeFillet((...))` — Make fillet.
- `makeOffset2D((...))` — Makes an offset shape (2d offsetting).
- `makeOffsetShape((...))` — Makes an offset shape (3d offsetting).
- `makeParallelProjection((...))` — Parallel projection of an edge or wire on this shape
- `makePerspectiveProjection((...))` — Perspective projection of an edge or wire on this shape
- `makeShapeFromMesh((...))` — Make a compound shape out of mesh data.
- `makeThickness((...))` — Hollow a solid according to given thickness and faces.
- `makeWires((...))` — Make wire(s) using the edges of this shape
- `mapShapes((...))` — mapShapes(generated, modified, op='')
- `mapSubElement((...))` — mapSubElement(shape|[shape...], op='') - maps the sub element of other shape
- `mirror((...))` — Mirror this shape on a given plane.
- `multiFuse((...))` — Union of this and a given list of topo shapes.
- `nullify((...))` — Destroys the reference to the underlying shape stored in this shape.
- `optimalBoundingBox((...))` — Get the optimal bounding box
- `overTolerance((...))` — Determines which shapes have a tolerance over the given value
- `project((...))` — Project a list of shapes on this shape
- `proximity((...))` — Returns two lists of Face indexes for the Faces involved in the intersection.
- `read((...))` — Read in an IGES, STEP or BREP file.
- `reflectLines((...))` — Build projection or reflect lines of a shape according to a view direction.
- `removeInternalWires((...))` — Removes internal wires (also holes) from the shape.
- `removeShape((...))` — Remove a sub-shape and return a new shape.
- `removeSplitter((...))` — Removes redundant edges from the B-REP model
- `replaceShape((...))` — Replace a sub-shape with a new shape and return a new shape.
- `reverse((...))` — Reverses the orientation of this shape.
- `reversed((...))` — Reverses the orientation of a copy of this shape.
- `revolve((...))` — Revolve the shape around an Axis to a given degree.
- `rotate((...))` — Apply the rotation (base, dir, degree) to the current location of this shape
- `rotated((...))` — Create a new shape with rotation.
- `scale((...))` — Apply scaling with point and factor to this shape.
- `scaled((...))` — Create a new shape with scale.
- `section((...))` — Section of this with a given (list of) topo shape.
- `sewShape((...))` — Sew the shape if there is a gap.
- `slice((...))` — Make single slice of this shape.
- `slices((...))` — Make slices of this shape.
- `tessellate((...))` — Tessellate the shape and return a list of vertices and face indices
- `toNurbs((...))` — Conversion of the complete geometry of a shape into NURBS geometry.
- `transformGeometry((...))` — Apply geometric transformation on this or a copy the shape.
- `transformShape((...))` — Apply transformation on a shape without changing the underlying geometry.
- `transformed((...))` — Create a new transformed shape
- `translate((...))` — Apply the translation to the current location of this shape.
- `translated((...))` — Create a new shape with translation
- `writeInventor((...))` — Write the mesh in OpenInventor format to a string.
- `applyRotation((...))` — Apply an additional rotation to the placement
- `applyTranslation((...))` — Apply an additional translation to the placement
- `countSubElements((...))` — Return the number of elements of a type
- `getElementIndexedName((...))` — getElementIndexedName(name) - Return the indexed element name
- `getElementMappedName((...))` — getElementMappedName(name) - Return the mapped element name
- `getElementName((...))` — getElementName(name,direction=0) - Return a mapped element name or reverse
- `getElementTypes((...))` — Return a list of element types present in the complex geometric data
- `getFaces((...))` — Return a tuple of points and triangles with a given accuracy
- `getFacesFromSubElement((...))` — Return vertexes and faces from a sub-element
- `getLines((...))` — Return a tuple of points and lines with a given accuracy
- `getLinesFromSubElement((...))` — Return vertexes and lines from a sub-element
- `getPoints((...))` — Return a tuple of points and normals with a given accuracy
- `setElementName((...))` — setElementName(element,name=None,postfix=None,overwrite=False,sid=None), Set an element name
- `dumpContent((...))` — dumpContent(Compression=3) -> bytearray
- `restoreContent((...))` — restoreContent(obj) -> None
- `getAllDerivedFrom((...))` — Returns all descendants
- `isDerivedFrom((...))` — Returns true if given type is a father

---
