# Issues Tracker

Review date: 2026-05-06
Scope: code review only, no implementation changes.

## Open Findings

- [ ] **P0 - Unauthenticated upload API can attach analyses to any project**
  - Files: `src/app/api/process-model/route.ts:19`, `src/app/api/process-model/route.ts:47`, `src/app/api/process-model/route.ts:69`
  - The route accepts `projectId` from form data and uses an API key to update that project. It does not verify the caller is logged in or owns the project. A client can post another project ID and attach an analysis to it.
  - Suggested fix: require a valid Appwrite session/JWT on the API route, fetch the project, verify ownership or document permission, then enqueue/update.

- [ ] **P0 - Job status endpoint exposes any queued/completed job by ID**
  - Files: `src/app/api/job-status/route.ts:87`, `src/app/api/job-status/route.ts:91`, `src/app/api/job-status/route.ts:97`
  - Anyone with a `jobId` can read progress, failure reasons, and completed return values. Completed results include `analysisId`, which can then be loaded by the public analysis collection.
  - Suggested fix: bind jobs to the authenticated user/project and reject status requests that do not match.

- [ ] **P0 - Analysis rows and GLB files are globally readable**
  - Files: `appwrite.config.json:125`, `appwrite.config.json:127`, `appwrite.config.json:285`, `appwrite.config.json:287`, `src/lib/db.ts:380`
  - `analysis` has `read("any")`, the mesh bucket has `read("any")`, and the client loads analyses directly by ID. The same bucket stores source CAD uploads and generated GLBs, so any leaked file URL can expose uploaded files or generated meshes outside the owning project.
  - Suggested fix: enable row/file security and write read permissions for the owner/project, or proxy access through an authenticated API route.

- [ ] **P0 - Project listing is not explicitly scoped to the current user**
  - Files: `src/lib/db.ts:26`, `src/app/(protected)/dashboard/page.tsx:123`, `appwrite.config.json:212`, `appwrite.config.json:213`
  - `getProjects()` lists all readable project documents without `Query.equal("userId", user.$id)`. If Appwrite table permissions or older project rows allow broad reads, every signed-in user can see every project in the dashboard.
  - Suggested fix: pass the current user id into `getProjects(userId)` and query by `userId`; also audit existing project document permissions and table-level read permissions.

- [ ] **P1 - IGES uploads are advertised but not supported end to end**
  - Files: `src/components/AnalysisWorkspace.tsx:233`, `src/app/api/process-model/route.ts:30`, `appwrite.config.json:293`, `workers/freecad.worker.ts:142`
  - The UI/API/storage config accept `.iges` and `.igs`, but the worker downloads every stored source file to `${fileId}.step`, so an IGES upload can be handed to FreeCAD with the wrong extension.
  - Suggested fix: either remove IGES/IGS from UI/API until supported, or preserve the original uploaded extension in the worker temp path.

- [ ] **P1 - Docker Compose Redis URL points at localhost inside containers**
  - Files: `docker-compose.yml:24`, `docker-compose.yml:39`, `README.md:91`
  - The compose default uses `redis://:securepassword123@127.0.0.1:6379` for both `web` and `worker`. Inside a container, `127.0.0.1` is that container, not the `cad-redis` service, so `docker compose up --build` can start containers that cannot enqueue or consume jobs unless `.env` overrides `REDIS_URL`.
  - Suggested fix: use `redis://:securepassword123@cad-redis:6379` for compose defaults and document local non-Docker Redis separately.

- [ ] **P2 - Opening a project with analysis flashes the upload screen**
  - Files: `src/app/(protected)/project/[id]/page.tsx:12`, `src/components/AnalysisWorkspace.tsx:65`, `src/components/AnalysisWorkspace.tsx:92`
  - `AnalysisWorkspace` starts in `view: "upload"` and only switches after the project fetch and analysis fetch complete. Reopening a processed project therefore briefly shows the upload screen before the viewer appears.
  - Suggested fix: add an initial `loadingAnalysis` state for project pages with unresolved `analysisId`, and show a neutral loading state instead of the upload card until the project/analysis decision is known.

- [ ] **P2 - Project navigation can show stale analysis after route changes**
  - Files: `src/app/(protected)/project/[id]/page.tsx:12`, `src/components/AnalysisWorkspace.tsx:92`
  - The project page does not ignore late `getProject()` responses after `params.id` changes, and `AnalysisWorkspace` returns early when `analysisId` is missing without clearing an existing analysis view. Navigating from a project with analysis to another project can show the previous project's analysis if the component instance is reused.
  - Suggested fix: cancel/ignore stale project fetches and reset `processedModel`/`view` when the project id changes without an analysis id.

- [ ] **P3 - App branding still says AutoQuotation**
  - Files: `src/app/login/page.tsx:34`, `src/app/login/page.tsx:38`, `src/app/login/page.tsx:55`, `src/app/layout.tsx:64`, `src/app/(protected)/dashboard/page.tsx:157`, `src/components/AnalysisWorkspace.tsx:459`, `README.md:1`
  - The product has moved to 3D Model Viewer, but login, metadata, dashboard header, upload footer, and README still use AutoQuotation/CNC quoting copy.
  - Suggested fix: choose one product name and update visible copy, metadata, and docs consistently.

## Verification

- `npm test` passed: 2 files, 10 tests.
- `npm run lint` passed.
- `npm run build` passed.
