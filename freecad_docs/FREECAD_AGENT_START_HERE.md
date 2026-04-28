# FreeCAD Agent Start Here

This file is the entry point for AI agents working on FreeCAD-related tasks inside `C:\Users\aditya\Desktop\auto-quotation`.

Do not treat one document as the entire source of truth. Use the documents below in order.

## Reading order

### 1. Start here for broad understanding

Read:

- [FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md)

Use it for:

- understanding what FreeCAD Python can do at a high level
- deciding which FreeCAD module family is relevant
- scoping whether a task belongs in `Part`, `Import`, `Mesh`, `Sketcher`, `Path`, `TechDraw`, or GUI modules

### 2. Then narrow to this application

Read:

- [AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md)

Use it for:

- understanding how FreeCAD should be used in `auto-quotation`
- staying aligned with the current server-side quoting architecture
- avoiding irrelevant FreeCAD subsystems when the task is about quoting

### 3. Then inspect the real implementation

Read:

- [extract_parts.py](C:\Users\aditya\Desktop\auto-quotation\scripts\extract_parts.py)
- [route.ts](C:\Users\aditya\Desktop\auto-quotation\src\app\api\analyze-parts\route.ts:1)

Use them for:

- the actual calling convention used by the app
- current STEP import/export flow
- shape traversal patterns
- existing measurement and stock-classification logic

## Task routing

### If the task is about STEP import/export

Open first:

- [AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md)
- [FreeCAD.Import.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Import.html)
- [FreeCAD.Part.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Part.html)
- [extract_parts.py](C:\Users\aditya\Desktop\auto-quotation\scripts\extract_parts.py)

### If the task is about exact geometry analysis

Open first:

- [FreeCAD.Part.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Part.html)
- [__FreeCADBase__.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\__FreeCADBase__.html)
- [AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md)
- [extract_parts.py](C:\Users\aditya\Desktop\auto-quotation\scripts\extract_parts.py)

### If the task is about placements, transforms, or bounding boxes

Open first:

- [__FreeCADBase__.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\__FreeCADBase__.html)
- [FreeCAD.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.html)
- [FreeCAD.Part.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Part.html)

### If the task is about assemblies, linked objects, or part flattening

Open first:

- [FreeCAD.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.html)
- [FreeCAD.AssemblyApp.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.AssemblyApp.html)
- [FreeCAD.Part.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Part.html)
- [AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md)

### If the task is about meshing or viewer support

Open first:

- [FreeCAD.Mesh.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Mesh.html)
- [FreeCAD.MeshPart.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.MeshPart.html)
- [ModelViewer.tsx](C:\Users\aditya\Desktop\auto-quotation\src\components\ModelViewer.tsx:1)

### If the task is about future quoting features

Open first:

- [FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md)
- [AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md)

Examples:

- CAM/time estimation: open `Path` docs
- material-aware pricing: open `Materials` docs
- 2D profile export: open `Import` and `TechDraw` docs
- parametric pricing rules: open `Spreadsheet` docs

## Default rules for agents

- Prefer exact `Part` geometry over mesh-derived guesses for backend decisions.
- Keep FreeCAD work server-side and headless unless the task explicitly needs GUI behavior.
- Reuse the patterns already present in [extract_parts.py](C:\Users\aditya\Desktop\auto-quotation\scripts\extract_parts.py).
- Do not assume the public/generated docs are perfect; verify behavior against the existing script and runtime behavior when needed.
- Prefer minimal, app-relevant FreeCAD usage over broad framework exploration.

## Minimum context set for most tasks

For most `auto-quotation` FreeCAD tasks, an agent should read these four first:

- [FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md)
- [AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md)
- [extract_parts.py](C:\Users\aditya\Desktop\auto-quotation\scripts\extract_parts.py)
- [FreeCAD.Part.html](C:\Users\aditya\Desktop\auto-quotation\freecad_docs\FreeCAD.Part.html)

## Short answer for agents

If the task is about quoting a CAD file:

1. Read the capability map.
2. Read the app-specific guide.
3. Read `extract_parts.py`.
4. Drill into `FreeCAD.Part.html`, `FreeCAD.Import.html`, and `__FreeCADBase__.html` only as needed.
