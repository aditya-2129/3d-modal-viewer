# FreeCAD Python API Full Capability Map

This document is broader than the quotation-specific guide. It maps the major things FreeCAD can do through Python and marks how relevant they are for `C:\Users\aditya\Desktop\auto-quotation`.

## How to read this

- `High` means directly useful for your current quoting backend.
- `Medium` means useful once the app grows into richer CAD preprocessing or automation.
- `Low` means Python-accessible, but probably not important for this app right now.

The local docs folder has been refreshed from the localhost FreeCAD doc index and now contains a much larger mirror, including module pages, topics, and keywords.

## 1. Core application and document API

Relevance: `High`

Main areas:

- create, open, close, and enumerate documents
- activate documents and fetch them by name
- inspect document objects and their properties
- handle placements and document-level state
- store or read preferences through parameter trees

Typical capabilities:

- `FreeCAD.newDocument(...)`
- `FreeCAD.openDocument(...)`
- `FreeCAD.closeDocument(...)`
- `FreeCAD.activeDocument()`
- `FreeCAD.listDocuments()`
- `FreeCAD.ParamGet(...)`

Why it matters for you:

- every backend quote run should create and close documents cleanly
- preference storage can later hold defaults for units, stock rules, tolerances, and output behavior

## 2. Base geometry and math types

Relevance: `High`

Main areas:

- vectors
- rotations
- placements
- matrices
- bounding boxes
- geometric precision helpers

Typical capabilities:

- `Vector` math
- `Rotation` construction and conversion
- `Placement` composition
- `Matrix` transforms
- `BoundBox` intersection, containment, scaling, movement, transformed bounds

Why it matters for you:

- normalize imported part orientation
- calculate envelopes
- reason about dominant axes
- compare local vs transformed geometry

## 3. Exact B-Rep geometry with `Part`

Relevance: `High`

Main areas:

- STEP/BREP shape loading
- exact solids, shells, faces, wires, edges, vertices
- booleans
- topology traversal
- primitive creation
- surface and shape construction
- transformations

Typical capabilities:

- `Part.read(...)`
- `Part.insert(...)`
- `Part.export(...)`
- `Part.makeBox(...)`
- `Part.makeCylinder(...)`
- `Part.makeCompound(...)`
- `Part.makeFace(...)`
- `Part.makeShell(...)`
- `Part.makeSolid(...)`
- `Part.makeRevolution(...)`
- shape methods like `copy`, `cut`, `fuse`, `common`, `transformGeometry`

Geometry properties you can inspect:

- `ShapeType`
- `BoundBox`
- `Volume`
- `Area`
- `CenterOfMass`
- `PrincipalProperties`
- `Solids`, `Faces`, `Edges`, `Vertexes`
- `isInside(...)`

Why it matters for you:

- this is the heart of a quoting backend
- exact geometry is where stock classification, machining heuristics, and part splitting should live

## 4. Import and export pipelines

Relevance: `High`

Main areas:

- STEP import/export
- DXF support
- object-level export and shape-level export
- file-to-document and file-to-shape workflows

Typical capabilities:

- `Import.open(...)`
- `Import.insert(...)`
- `Import.export(...)`
- `Import.StepShape.read(...)`
- `Import.writeDXFObject(...)`
- `Import.writeDXFShape(...)`
- `Part.exportUnits(...)`

Why it matters for you:

- receive customer STEP files
- export isolated part STEP files
- later emit DXF for plate or profile parts

## 5. Assembly and object-graph traversal

Relevance: `High`

Main areas:

- assembly-aware document objects
- linked objects
- nested subobjects
- placement-aware traversal

Typical capabilities visible in docs:

- `getLinkedObject(...)`
- `getSubObject(...)`
- `getPlacementOf(...)`
- `getGlobalPlacementOf(...)`

Why it matters for you:

- real customer files often contain nested compounds, links, and repeated instances
- quote logic needs a stable way to flatten an assembly into quoteable parts

## 6. Measurement and analysis

Relevance: `High`

Main areas:

- exact dimensions from B-Rep
- bounding boxes and transformed bounds
- inertia and symmetry
- face/surface classification
- containment and intersection checks

Good fit for your app:

- part envelope dimensions
- volume-based mass estimation
- rotational symmetry detection
- hole detection heuristics
- lathe-vs-mill classification
- removed-material estimation
- duplicate-part signature generation

## 7. Mesh and tessellation APIs

Relevance: `Medium`

Main areas:

- mesh generation from shapes
- mesh inspection
- mesh-part conversions
- triangulation-oriented outputs

Modules:

- `Mesh`
- `MeshPart`
- `MeshGui`

Why it matters for you:

- useful if you later want server-side fallback previews
- useful for rough complexity metrics
- less reliable than exact `Part` data for quoting decisions

For your app:

- keep viewer work mesh-based
- keep quote logic exact-shape-based

## 8. Sketching and parametric 2D definition

Relevance: `Medium`

Main areas:

- sketch creation
- geometric constraints
- dimensional constraints
- parametric 2D definition for downstream solids

Modules:

- `Sketcher`
- `SketcherGui`

Useful later if:

- you start generating manufactured geometry programmatically
- you want to reconstruct simple profiles before export

Not urgent for current quoting flow.

## 9. PartDesign feature-tree modeling

Relevance: `Medium`

Main areas:

- pads
- pockets
- revolves
- additive and subtractive features
- body-driven parametric model construction

Modules:

- `PartDesign`
- `_PartDesign`
- `PartDesignGui`

Useful later if:

- you want editable manufacturing models rather than just imported customer geometry

Not necessary for current import-analyze-export backend work.

## 10. Draft, Arch, BIM, and construction-oriented modules

Relevance: `Low` to `Medium`

Main areas:

- Draft geometry helpers
- Arch objects like walls, windows, stairs, structures
- BIM-style higher-level objects

Modules visible in the refreshed docs:

- `Draft`
- `DraftGeomUtils`
- `DraftVecUtils`
- `Arch`
- many `Arch*` modules

Useful later if:

- you branch into architectural or construction quotation

Probably low priority for this app unless your STEP inputs start coming from building workflows.

## 11. Spreadsheet, expressions, and parametric data

Relevance: `Medium`

Main areas:

- spreadsheet-driven parameters
- expressions
- data tables inside FreeCAD documents

Modules:

- `Spreadsheet`

Useful later if:

- you want rule-driven quote templates
- you want editable cost parameter tables inside FreeCAD documents
- you want parametric batch studies

## 12. Materials and property metadata

Relevance: `Medium`

Main areas:

- materials libraries
- material assignment
- metadata-driven analysis

Modules:

- `Materials`
- `MaterialAPI`
- `MatGui`

Useful later if:

- quote price depends on density, material family, machinability, or finish class

## 13. TechDraw and documentation output

Relevance: `Medium`

Main areas:

- drawing sheets
- views
- dimensioned outputs
- printable technical documents

Modules:

- `TechDraw`
- `TechDrawGui`
- `TechDrawTools`

Useful later if:

- you want to auto-generate manufacturing packs or preview sheets from uploaded parts

## 14. Path / CAM capabilities

Relevance: `Medium`

Main areas:

- toolpaths
- job setup
- machining operations
- simulation

Modules:

- `Path`
- `PathApp`
- `PathCommands`
- `PathGui`
- `PathScripts`
- `PathSimulator`

Useful later if:

- you want quote quality to improve by estimating actual machining operations
- you want rough machine-time estimation

This is one of the strongest future-upgrade areas once basic quoting is stable.

## 15. FEM and simulation

Relevance: `Low` to `Medium`

Main areas:

- finite element analysis
- meshing for simulation
- loads, constraints, results

Modules:

- `Fem`
- `FemGui`
- `ObjectsFem`

Useful later if:

- you quote engineering parts that require validation or stiffness checks

Not core to your current app.

## 16. Robot and kinematics modules

Relevance: `Low`

Main areas:

- robot models
- trajectories
- kinematic placement logic

Modules:

- `Robot`
- robot example modules

Interesting, but not relevant unless your quoting domain changes significantly.

## 17. GUI scripting and interactive automation

Relevance: `Low` now, `Medium` later

Main areas:

- selections
- commands
- workbenches
- task panels
- docking UI
- scene/view providers

Modules:

- `FreeCADGui`
- `PartGui`
- `ImportGui`
- `MeasureGui`
- `TechDrawGui`
- `StartGui`
- many workbench GUI modules

Useful later if:

- you build a desktop helper around FreeCAD
- you want interactive manual review tooling

Not needed for a headless web backend.

## 18. Python-defined custom objects

Relevance: `Medium`

Main areas:

- `FeaturePython`
- custom document objects
- custom properties
- recomputable objects
- Python-side extensibility of FreeCAD’s object model

From the collected developer guide:

- document objects
- property framework
- `FeaturePython`
- `FeaturePythonT`
- Python-side proxy patterns

Useful later if:

- you want a persistent quote-analysis object inside a FreeCAD document
- you want saved stock recommendations, machining tags, or derived manufacturing metadata

## 19. Addons, macros, commands, and workbench ecosystem

Relevance: `Low` now, `Medium` later

Main areas:

- addon management
- macros
- custom commands
- workbench packaging

Modules visible in docs:

- `AddonManager`
- `MacroCacheCreator`
- command modules
- many workbench-specific entry points

Useful later if:

- you package your quotation workflow as a FreeCAD addon
- you want in-FreeCAD batch tools alongside the web app

## 20. Testing and developer tooling

Relevance: `Medium`

Main areas:

- module tests
- app tests
- workbench tests
- debugging-oriented modules

Modules visible in docs:

- `Test`
- `TestApp`
- `BaseTests`
- `MeshTestsApp`
- `PartDesignTests`
- `SketcherTests`
- `AssemblyTests`
- many `Test*` modules

Useful for your app because:

- geometry heuristics are easy to regress silently
- a FreeCAD-backed quoting engine benefits from golden STEP test fixtures and deterministic outputs

## 21. What is most important for AutoQuotation

If you want the practical shortlist, these are the highest-value FreeCAD Python areas for your app:

### Immediate priorities

- `FreeCAD` document lifecycle
- `__FreeCADBase__` math and placement types
- `Part` exact geometry and booleans
- `Import` / STEP workflows
- assembly flattening and subobject traversal
- exact measurement and stock classification

### Next upgrade candidates

- DXF output for 2D/profile parts
- material metadata
- server-side mesh fallback or complexity scoring
- spreadsheet/expressions for pricing rules
- `Path`/CAM-based machining-time estimation

### Mostly out of scope for now

- GUI scripting
- custom workbench UI
- FEM
- Robot
- deep PartDesign authoring

## 22. Bottom line

FreeCAD’s Python API is broad enough to support far more than import-and-measure. Through Python you can:

- manage documents
- inspect and transform exact CAD geometry
- import/export manufacturing formats
- traverse assemblies and linked objects
- build and compare solids
- derive manufacturing signals from topology
- store parametric metadata
- generate drawings, CAM data, or simulation workflows
- package custom automation into addons or workbenches

For `auto-quotation`, the winning strategy is still the same:

- use FreeCAD Python as the exact CAD engine on the backend
- keep the browser focused on visualization and user workflow
- grow into CAM/material/metadata modules only when the quote logic needs them
