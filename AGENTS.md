<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

keep this project simple this is an exprimental project to learn keep everything concise except code

FreeCAD docs — strict access rule

The `freecad_docs/` folder exists ONLY for tasks that directly involve `scripts/extract_parts.py` or any new FreeCAD Python script.

**Do not open, read, or reference any file in `freecad_docs/` unless your task is:**

- modifying `scripts/extract_parts.py`
- writing a new FreeCAD Python script
- debugging a FreeCAD geometry or Part API issue in a Python script

For all other tasks (UI, API routes, Next.js, TypeScript, CSS, etc.) — pretend `freecad_docs/` does not exist.

### When you DO need freecad_docs

1. Read `freecad_docs/API_MAP.md` first (~200 tokens). It tells you exactly which file and section to open.
2. Open only the specific section you need — do not load whole files.
3. File index:
   - `Part_API.md` — all Part classes, properties, methods
   - `PartEnums_API.md` — shape/orientation enum values
   - `FreeCAD_Part_API.md` — AttachEngine, Precision, module functions
   - `AUTO_QUOTATION_FREECAD_PYTHON_API_GUIDE.md` — app-specific patterns
   - `FREECAD_PYTHON_API_FULL_CAPABILITY_MAP.md` — broad capability survey
   - `FREECAD_AGENT_START_HERE.md` — task routing by topic
