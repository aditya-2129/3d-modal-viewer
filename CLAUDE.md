# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

## Architecture

**AutoQuotation** is a Next.js 16 app (App Router) that lets users upload STEP/STP CAD files, renders them in 3D, and analyzes their parts tree for quoting purposes.

### Data flow

1. User uploads a `.step`/`.stp` file via drag-and-drop on `src/app/page.tsx`
2. Clicking "Analyze Model" switches state to the split-panel analysis view
3. **Left panel** — `PartsList` POSTs the file to `/api/analyze-parts`, which writes it to a temp path and spawns `scripts/extract_parts.py` via FreeCAD's embedded Python (`C:\Program Files\FreeCAD 1.1\bin\python.exe`). The script writes JSON delimited by `__RESULT__` / `__END__` markers; the route parses and returns it
4. **Right panel** — `ModelViewer` reads the file entirely client-side using `occt-import-js` (WebAssembly), tessellates the geometry, and renders it with `@react-three/fiber`

### Key dependencies

| Package | Role |
|---|---|
| `occt-import-js` | Client-side STEP→mesh tessellation via WASM |
| `@react-three/fiber` + `three` | 3D canvas rendering |
| `@react-three/drei` | `OrbitControls`, `Environment`, `Html` helpers |

### Important constraints

- **Do not modify `scripts/extract_parts.py`** — server-side FreeCAD extraction script, off-limits until instructed
- `occt-import-js` WASM file is served from `/lib/` — the `locateFile` callback in `ModelViewer` must point there
- The API route hard-codes the FreeCAD Python path; this only works on the dev machine as configured
- Next.js 16 may have breaking changes from your training data — check `node_modules/next/dist/docs/` before writing Next.js-specific code
