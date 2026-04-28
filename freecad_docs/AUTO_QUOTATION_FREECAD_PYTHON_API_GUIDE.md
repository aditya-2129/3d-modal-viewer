# FreeCAD Python API Guide for AutoQuotation

This note is focused on what matters for `C:\Users\aditya\Desktop\auto-quotation`: server-side STEP ingestion, geometry analysis, part extraction, and quotation-oriented feature detection.

## Your current FreeCAD usage

The app already uses FreeCAD Python in two important places:

- [route.ts](C:\Users\aditya\Desktop\auto-quotation\src\app\api\analyze-parts\route.ts:7) launches FreeCAD's bundled `python.exe` and passes a STEP file plus output folder to the backend script.
- [extract_parts.py](C:\Users\aditya\Desktop\auto-quotation\scripts\extract_parts.py:450) loads the STEP file into a FreeCAD document, walks `doc.Objects`, reads `obj.Shape`, measures geometry, classifies stock, and exports child parts back out as individual STEP files.

That means your app is already using the right architectural split:

- FreeCAD Python for exact CAD topology and manufacturing logic
- `occt-import-js` in the browser for lightweight viewing only

## Core modules you can rely on

For this app, the main Python API surface is:

- `FreeCAD`: document lifecycle, math types, placements, preferences
- `Part`: exact B-Rep geometry, STEP IO, solids/faces/edges, booleans, construction helpers
- `Import`: alternative import/export entry points, especially for STEP/DXF workflows
- `__FreeCADBase__`: `Vector`, `Rotation`, `Placement`, `Matrix`, `BoundBox`

Useful documented entry points already present in your mirrored docs:

- `FreeCAD.newDocument`, `openDocument`, `closeDocument`, `activeDocument`, `listDocuments`
- `Part.insert`, `Part.read`, `Part.export`, `Part.exportUnits`
- `Part.makeBox`, `makeCylinder`, `makeCompound`, `makeFace`, `makeShell`, `makeSolid`, `makeRevolution`, `makeSplitShape`, `sortEdges`
- `Import.open`, `Import.insert`, `Import.export`, `Import.StepShape.read`

## What you can do with the Python API for quoting

### 1. Load STEP files exactly

Use FreeCAD when you need exact topology, not just triangles.

Typical patterns:

```python
import FreeCAD, Part

doc = FreeCAD.newDocument("quote")
Part.insert(step_path, doc.Name)
```

Or, when you want a single shape directly:

```python
import Part

shape = Part.read(step_path)
```

Use this for:

- assembly import
- exact solids extraction
- manufacturing analysis before meshing
- reliable export of cleaned child parts

### 2. Traverse assemblies and split them into quoteable parts

Your current script already does the basics well:

- iterate `doc.Objects`
- check `hasattr(obj, "Shape")`
- inspect `shape.ShapeType`
- branch on `shape.Solids`

You can extend this to handle:

- nested compounds
- linked objects and transformed sub-objects
- repeated instances
- placement-aware sub-part extraction

Key objects and properties:

- `doc.Objects`
- `obj.Name`, `obj.Label`
- `obj.Shape`
- `shape.ShapeType`
- `shape.Solids`, `shape.Faces`, `shape.Edges`, `shape.Vertexes`
- `obj.Placement`

### 3. Compute the measurements a quotation engine needs

This is the strongest reason to keep FreeCAD in the backend.

You can directly derive:

- bounding box size from `shape.BoundBox`
- true solid volume from `shape.Volume`
- surface area from `shape.Area`
- centroid from `shape.CenterOfMass`
- inertia and symmetry signals from `shape.PrincipalProperties`
- inside/outside tests from `shape.isInside(...)`
- face inventory from `shape.Faces` and `face.Surface`

This supports quoting features such as:

- stock size suggestion
- round vs hex vs rectangular stock classification
- part envelope dimensions
- material volume estimation
- center-of-mass driven fixturing hints
- rotational symmetry detection
- outer cylinder detection
- simple turning vs milling heuristics

### 4. Inspect topology for manufacturing features

You are not limited to coarse dimensions. With FreeCAD Python you can inspect topology deeply enough to build better feature detectors.

Examples of what you can infer:

- hole counts from cylindrical faces
- through-hole vs blind-hole heuristics
- dominant machining axis from inertia plus placement
- planar vs cylindrical area ratio
- face-count based hex/prismatic detection
- thin-wall or plate-like parts from aspect ratios
- likely lathe parts from rotational symmetry plus cylinder dominance

In practice, the most useful raw inputs are:

- `type(face.Surface).__name__`
- `face.Area`
- `face.normalAt(...)`
- `face.ParameterRange`
- `shape.CenterOfMass`
- `shape.PrincipalProperties`
- `shape.BoundBox`

### 5. Transform, normalize, and canonicalize geometry

This is useful before analysis so every part is measured consistently.

FreeCAD gives you:

- `Vector` for directions and dimensions
- `Rotation` for orientation handling
- `Placement` for object transforms
- `Matrix` for accumulated transforms
- `BoundBox.transformed(...)` for transform-aware envelopes

Practical quoting uses:

- normalize part orientation before stock estimation
- move models near origin before export
- align a part to its dominant axis
- compare raw bounds vs transformed bounds
- account for linked-instance placement instead of assuming local coordinates

### 6. Build helper geometry for analysis

The `Part` module is not only for reading files. It can also construct analysis geometry.

Useful constructors:

- `Part.makeBox`
- `Part.makeCylinder`
- `Part.makeCompound`
- `Part.makeFace`
- `Part.makeShell`
- `Part.makeSolid`
- `Part.makeRevolution`
- `Part.makeSplitShape`

These help when you want to:

- create stock candidates and compare them against the imported part
- build section planes or split helpers
- generate envelopes
- create simple fixture or raw-material previews
- test heuristics against synthetic parts

### 7. Run boolean and comparison workflows

For quoting, booleans are useful even if you never expose CAD editing in the UI.

Typical uses:

- compare stock shape vs final part
- estimate removed volume
- compare two revisions
- identify leftover bounding-stock waste
- isolate intersecting geometry zones

The common shape-level operations to look for are:

- `copy`
- `cut`
- `fuse`
- `common`
- `transformGeometry`

These are especially useful for "material removal" style metrics.

### 8. Export the exact results you want downstream

You already export isolated child solids as STEP. FreeCAD can keep doing that reliably.

Useful export paths:

- `Part.export([shape], path)`
- `Import.export([...], path)`
- `Part.exportUnits(...)` for STEP/IGES unit control
- `Import.writeDXFShape(...)` or `writeDXFObject(...)` when you later need 2D profiles

Good outputs for this app:

- isolated STEP per quoteable part
- normalized STEP after reorientation
- DXF for flat profiles
- mesh export only when a downstream non-CAD viewer needs it

### 9. Persist richer analysis in document objects later

If the app grows beyond one-shot analysis, FreeCAD also supports document objects and Python-backed features.

From the collected docs and guide, the important concepts are:

- `DocumentObject`
- `Property*` system
- `FeaturePython`
- `FeaturePythonT`

This becomes useful if you later want:

- quote metadata stored inside a FreeCAD document
- custom Python features for stock analysis
- recomputable analysis objects
- saved manufacturing annotations

For the current app, this is optional. Your existing stateless script model is simpler and is the right default.

## Best next upgrades for this app

If I were extending `auto-quotation`, I would prioritize these FreeCAD API additions first:

### High value now

- placement-aware part extraction so repeated or transformed instances are handled correctly
- true removed-volume estimation by comparing part against candidate stock
- hole detection and hole summary per part
- sheet/plate detection for routing parts to a different quoting path
- unit normalization using `Part.exportUnits(...)`
- per-part material mass once density is known

### Good next step

- DXF export for 2D profiles when a part is effectively planar
- section/slice generation for thickness checks
- tolerance-aware clustering of nearly identical parts
- shape hashing or signature generation for duplicate detection
- richer assembly flattening using linked-object traversal

### Probably not needed yet

- GUI modules like `FreeCADGui`, `PartGui`, `ImportGui`
- full custom workbench development
- view providers
- interactive FreeCAD document editing inside the web app

## Recommended backend pattern

For your current server-side use case, this is the cleanest pattern:

1. Create a temporary FreeCAD document.
2. Import or read the STEP file.
3. Flatten and normalize the geometry you care about.
4. Measure exact B-Rep properties.
5. Run quoting heuristics.
6. Export isolated parts if needed.
7. Close the document every time.

Minimal skeleton:

```python
import FreeCAD, Part

doc = FreeCAD.newDocument("quote")
try:
    Part.insert(step_path, doc.Name)
    for obj in doc.Objects:
        if not hasattr(obj, "Shape") or obj.Shape is None:
            continue
        shape = obj.Shape
        bbox = shape.BoundBox
        volume = shape.Volume
        area = shape.Area
finally:
    FreeCAD.closeDocument(doc.Name)
```

## Important notes for your app

- Keep FreeCAD on the server side only. The browser should stay mesh/viewer-only.
- Prefer exact `Part` geometry for quoting logic; do not base pricing rules on tessellated viewer meshes.
- Always close documents to avoid memory growth across repeated requests.
- If you start creating document objects instead of raw shapes, call recompute where needed.
- Use `Part.read(...)` when you only need a shape and not a populated document tree.
- Use `Part.insert(...)` or `Import.insert(...)` when assembly/document structure matters.

## Short answer

Using FreeCAD Python API, your app can already do much more than "read a STEP file":

- import assemblies exactly
- inspect exact solids/faces/edges
- compute envelope, area, volume, centroid, and inertia
- infer manufacturing stock and machining style
- split compounds into quoteable children
- normalize orientation and placement
- compare part vs stock with booleans
- export cleaned STEP or DXF deliverables
- later, persist custom analysis as FreeCAD document features

That is enough to build a serious quotation backend around FreeCAD without needing the FreeCAD GUI.

## Scope check: what this guide does and does not cover

This guide is intentionally focused on quotation backend work. It does **not** try to document the entire FreeCAD Python surface.

### Covered well for this app

- document lifecycle
- STEP import/export
- exact `Part` geometry analysis
- assemblies, compounds, solids, faces, edges
- bounding boxes, area, volume, centroid, inertia
- placements and transforms
- stock classification and manufacturing heuristics
- server-side export of isolated parts

### Not covered fully yet

- full sketch creation and constraint scripting with `Sketcher`
- full `PartDesign` feature tree creation
- spreadsheet-driven parametrics and expressions
- `TechDraw` generation
- `Path`/CAM job generation
- FEM workflows
- GUI scripting with `FreeCADGui`, selection, commands, workbenches, and dock panels
- custom workbench registration and command wiring
- custom `FeaturePython` + `ViewProvider` authoring in depth
- material libraries, BOM pipelines, and document persistence patterns
- non-STEP import/export workflows beyond the most relevant ones

### Practical conclusion

For `auto-quotation`, the missing items above are not blockers. The current guide covers the Python API areas that are highest value for:

- reading customer CAD
- measuring it exactly
- classifying manufacturable stock
- splitting/exporting parts
- building quotation logic on top
