# Issues Tracker

Review date: 2026-05-06
Scope: code review only, no implementation changes.

## Open Findings

- [x] **P0 - Unauthenticated upload API can attach analyses to any project**
  - Files: `src/app/api/process-model/route.ts:19`, `src/app/api/process-model/route.ts:47`, `src/app/api/process-model/route.ts:69`
  - The route accepts `projectId` from form data and uses an API key to update that project. It does not verify the caller is logged in or owns the project. A client can post another project ID and attach an analysis to it.
  - Suggested fix: require a valid Appwrite session/JWT on the API route, fetch the project, verify ownership or document permission, then enqueue/update.

- [x] **P0 - Job status endpoint exposes any queued/completed job by ID**
  - Files: `src/app/api/job-status/route.ts:87`, `src/app/api/job-status/route.ts:91`, `src/app/api/job-status/route.ts:97`
  - Anyone with a `jobId` can read progress, failure reasons, and completed return values. Completed results include `analysisId`, which can then be loaded by the public analysis collection.
  - Suggested fix: bind jobs to the authenticated user/project and reject status requests that do not match.

- [x] **P0 - Analysis rows and GLB files are globally readable**
  - Files: `appwrite.config.json:125`, `appwrite.config.json:127`, `appwrite.config.json:285`, `appwrite.config.json:287`, `src/lib/db.ts:380`
  - `analysis` has `read("any")`, the mesh bucket has `read("any")`, and the client loads analyses directly by ID. The same bucket stores source CAD uploads and generated GLBs, so any leaked file URL can expose uploaded files or generated meshes outside the owning project.
  - Suggested fix: enable row/file security and write read permissions for the owner/project, or proxy access through an authenticated API route.

- [x] **P0 - Project listing is not explicitly scoped to the current user**
  - Files: `src/lib/db.ts:26`, `src/app/(protected)/dashboard/page.tsx:123`, `appwrite.config.json:212`, `appwrite.config.json:213`
  - `getProjects()` lists all readable project documents without `Query.equal("userId", user.$id)`. If Appwrite table permissions or older project rows allow broad reads, every signed-in user can see every project in the dashboard.
  - Suggested fix: pass the current user id into `getProjects(userId)` and query by `userId`; also audit existing project document permissions and table-level read permissions.

- [x] **P1 - IGES uploads are advertised but not supported end to end**
  - Files: `src/components/AnalysisWorkspace.tsx:233`, `src/app/api/process-model/route.ts:30`, `appwrite.config.json:293`, `workers/freecad.worker.ts:142`
  - The worker now extracts and preserves the original file extension (e.g., `.iges`, `.igs`) when downloading files from Appwrite, ensuring FreeCAD's `Part.insert` uses the correct importer.
  - Fix: updated `freecad.worker.ts` to destructure `fileName` from job data and use its extension for the temporary file path.

- [x] **P2 - Opening a project with analysis flashes the upload screen**
  - Files: `src/app/(protected)/project/[id]/page.tsx:12`, `src/components/AnalysisWorkspace.tsx:65`, `src/components/AnalysisWorkspace.tsx:92`
  - Added a neutral loading state in `AnalysisWorkspace` that remains active until both the project fetch and any subsequent analysis fetch are resolved.
  - Fix: implemented `isLoadingProject` prop and `isInitialLoading` state to manage the transition from blank to viewer or upload screen.

- [x] **P2 - Project navigation can show stale analysis after route changes**
  - Files: `src/app/(protected)/project/[id]/page.tsx:12`, `src/components/AnalysisWorkspace.tsx:92`
  - The project page now ignores late `getProject()` responses after `params.id` changes, and `AnalysisWorkspace` resets its state when `analysisId` is missing.
  - Fix: added `active` flags to `useEffect` hooks and explicit state resets on prop changes.

- [x] **P3 - App branding still says AutoQuotation**
  - Files: `src/app/login/page.tsx:34`, `src/app/login/page.tsx:38`, `src/app/login/page.tsx:55`, `src/app/layout.tsx:64`, `src/app/(protected)/dashboard/page.tsx:157`, `src/components/AnalysisWorkspace.tsx:459`, `README.md:1`
  - The product has moved to 3D Model Viewer, but login, metadata, dashboard header, upload footer, and README still use AutoQuotation/CNC quoting copy.
  - Fix: Renamed app to "3D Model Viewer" and updated references to "CNC quoting" to generic "3D model analysis" across the codebase.

## Verification

- `npm test` passed: 2 files, 10 tests.
- `npm run lint` passed.
- `npm run build` passed.

## Security Verification (2026-05-06)

- [x] **RLS & File Security**: Verified via `verify_security.ts` that analysis documents and GLB files have strict per-user permissions.
- [x] **Project Ownership**: Verified that `/api/process-model` rejects unauthorized project access.
- [x] **Authenticated 3D View**: Verified that `ModelViewer` successfully loads protected GLB files using JWT-based authenticated fetching.
- [x] **End-to-End Flow**: Successfully completed a full upload, analysis, and viewing cycle with security active.
