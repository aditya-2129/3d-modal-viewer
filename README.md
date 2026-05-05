# 3D Model Viewer

Experimental 3D CAD viewer and geometry analysis app.

The app lets a signed-in user create projects, upload STEP/STP/IGES files, process them with a FreeCAD worker, and view the generated GLB mesh with a parts/stock breakdown.

## Stack

- Next.js 16 App Router
- React 19
- Three.js via `@react-three/fiber` and `@react-three/drei`
- Appwrite for auth, database, and file storage
- Redis + BullMQ for CAD processing jobs
- FreeCAD Python scripts for geometry analysis and GLB generation

## How It Works

1. The browser uploads a CAD file to `/api/process-model`.
2. The API stores the source file in Appwrite Storage and enqueues a BullMQ job.
3. `workers/freecad.worker.ts` downloads the file, runs `scripts/process_model.py` through FreeCAD, uploads the GLB result, and stores analysis metadata in Appwrite.
4. The browser polls `/api/job-status` and loads the completed analysis into the viewer.

## Requirements

- Node.js 20+
- Redis
- Appwrite project with the schema from `appwrite.config.json`
- FreeCAD available to the worker as either:
  - `freecadcmd`
  - `snap run freecad.cmd`

## Environment

Create `.env` in the project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=3d-modal-viewer-database
APPWRITE_MESH_BUCKET_ID=glb-meshes
REDIS_URL=redis://127.0.0.1:6379
```

`APPWRITE_DATABASE_ID` and `APPWRITE_MESH_BUCKET_ID` should match `appwrite.config.json`.

## Appwrite Setup

Push the database and bucket config with:

```bash
npx appwrite push tables
```

Google OAuth also needs to be enabled in the Appwrite console for login to work.

## Local Development

Install dependencies:

```bash
npm install
```

Start Redis, then run the app:

```bash
npm run dev
```

In another terminal, start the CAD worker:

```bash
npm run worker
```

The app runs at:

```text
http://localhost:4000
```

## Docker

The repo includes:

- `Dockerfile` for the Next.js app
- `Dockerfile.worker` for the FreeCAD worker
- `docker-compose.yml` for app, worker, and Redis

Run with:

```bash
docker compose up --build
```

## Useful Commands

```bash
npm run dev      # Next dev server on port 4000
npm run worker   # FreeCAD/BullMQ worker
npm run build    # Production build
npm run start    # Start built Next app
npm run lint     # ESLint
npm test         # Vitest
```

## Project Structure

- `src/app/` - Next.js pages and API routes
- `src/app/(protected)/` - auth-gated dashboard, viewer, and project pages
- `src/components/` - viewer, analysis workspace, parts list, dashboard UI
- `src/lib/` - Appwrite, database helpers, queue setup, constants
- `workers/freecad.worker.ts` - BullMQ worker that runs FreeCAD
- `scripts/process_model.py` - FreeCAD processing script used by the worker
- `scripts/extract_parts.py` - geometry helpers used by `process_model.py`
- `appwrite.config.json` - Appwrite database/bucket schema

## Notes

This is a learning project, so keep changes small and easy to understand.
