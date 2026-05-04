# Issues Tracker

## Dead Code / Unused Code

- [x] **1. `src/app/api/analyze-parts/route.ts` — Entire route is dead code**
  Never called from anywhere in the frontend. All uploads go through `/api/process-model`. The `"analyze-parts"` job type in the worker (`freecad.worker.ts:153`) is only reachable via this orphaned route.

- [x] **2. `src/components/PartsList.tsx:319-320` — Dead state and hardcoded constant**
  `const [error] = useState<string | null>(null)` (setter never destructured, value never changes) and `const loading = false` (never changes). Both are passed into `PartsListContent`, making the loading skeleton and error UI inside it permanently unreachable dead code — leftover from an older async design.

- [x] **3. `src/components/AnalysisWorkspace.tsx:107,127` — Redundant dynamic `import("@/lib/db")`**
  `getAnalysis` is already statically imported at the top of the file (line 6), but then re-imported via `await import("@/lib/db")` in two places inside the polling logic. The dynamic imports are unnecessary.

- [x] **4. `.env:6` — Empty env variable `NEXT_PUBLIC_APPWRITE_ORIGINAL_BUCKET_ID`**
  Defined but never referenced anywhere in the codebase.

- [x] **5. `test.js` (project root) — Leftover debug file**
  A 2-line debug script (`console.log(typeof InputFile.fromBuffer)`) sitting in the root. Stray artifact from debugging.

---

## Security Issues

- [x] **6. `workers/freecad.worker.ts:11-13` — Sensitive credentials logged to stdout**
  Three raw `console.log` calls at startup dump `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`, and the full `APPWRITE_API_KEY` value to stdout with no masking.

- [x] **7. `src/lib/queue.ts:4` — Hardcoded Redis password in fallback URL**
  `"redis://:securepassword123@127.0.0.1:6379"` is the default fallback, embedding a password directly in source code.

- [x] **8. `.env` — API key committed to version control**
  `APPWRITE_API_KEY` contains a full live API key in `.env` which is tracked by git. Should be in `.env.local` (git-ignored). - i have single .env file no .env.local - so check this properly

---

## Hardcoded / Duplicated Constants

- [x] **9. `src/app/api/process-model/route.ts:29` — Database ID re-hardcoded**
  `process.env.APPWRITE_DATABASE_ID ?? "3d-modal-viewer-database"` duplicates the fallback already defined in `src/lib/constants.ts:1`. Same pattern also in `workers/freecad.worker.ts:24`. Neither imports `DATABASE_ID` from constants.

- [x] **10. `next.config.ts:4` — Personal ngrok dev domain hardcoded in config**
  `allowedDevOrigins: ["mitch-subtropical-undiscernably.ngrok-free.dev"]` is a personal dev tunnel URL committed to the project config.

---

## CSS / Styling Issues

- [x] **11. `src/app/globals.css:1` + `src/app/layout.tsx:24-29` — Duplicate Google Fonts loading**
  The same fonts (`Syne`, `IBM Plex Mono`) are loaded twice: once via `@import url()` in `globals.css` and again via `<link>` tags in `layout.tsx`, causing double network requests.

- [x] **12. `src/app/globals.css:4-81` — Entire theme duplicated with inconsistent naming**
  All design tokens are defined twice: once in `@theme {}` (Tailwind v4 system, `--duration-snap`, `--radius-xs`) and again in `:root {}` (plain CSS vars, `--dur-snap`, `--r-xs`). Different naming schemes between the two blocks leads to confusion about which set to use.

---

## Type Safety Issues

- [x] **13. `src/components/ModelViewer.tsx:70-71` — `(controls as any)` casts**
  `OrbitControls` is cast to `any` to access `.target` and `.update()`. The correct type from `@react-three/drei` should be used instead.

- [x] **14. `src/components/AnalysisWorkspace.tsx:145` — `catch (e: any)`**
  Caught error typed as `any`. Should be `unknown` with a type guard.

- [x] **15. `workers/freecad.worker.ts:88` — `result?: any` in return type**
  `runPython` returns `result?: any` — the actual parsed Python JSON result has no type definition.

---

## Bad Practices / Code Quality

- [x] **16. `src/components/ModelViewer.tsx:9-12` — Global `console.warn` monkey-patch**
  Globally overriding `console.warn` to suppress a `THREE.Clock` deprecation is a fragile hack that silences all warnings matching the pattern across the entire app.

- [x] **17. `src/components/AnalysisWorkspace.tsx:181,192` — `alert()` for validation feedback**
  Two `alert()` calls for invalid file type errors, while a `processingError` state already exists specifically for inline error display.

- [x] **18. `src/app/(protected)/dashboard/page.tsx:43` — `window.location.href` for post-logout navigation**
  Uses direct browser navigation instead of `router.replace("/login")`, inconsistent with every other navigation call in the codebase.

- [x] **19. `src/app/(protected)/dashboard/page.tsx:133` — `setLoading(true)` leaked outside `fetchProjects`**
  The retry button manually calls `setLoading(true)` before invoking `fetchProjects`, but the loading state management should live entirely inside `fetchProjects` itself.

- [x] **20. `src/app/(protected)/project/[id]/page.tsx:9` — Project name is a truncated document ID**
  `projectName={\`Project ${params.id.slice(0, 8)}\`}` shows a placeholder derived from the Appwrite document ID. The actual `project.name` from the database is never fetched at this level and passed in.

- [x] **21. `src/lib/db.ts:14` — Wrong JSDoc comment on `getAnalysis`**
  The comment says `"Fetch all projects for the current user."` — copy-paste error from the `getProjects` function directly below it.

- [x] **22. `src/app/api/process-model/route.ts:46` + `workers/freecad.worker.ts:149` — Silent empty `catch {}`**
  Cache-check errors are swallowed entirely with no logging. A failed cache check could mask configuration or network issues.

- [x] **23. `src/components/dashboard/ProjectList.tsx:1` — Unnecessary `"use client"` directive**
  `ProjectList` uses no hooks or browser APIs — only renders JSX with `next/link`. It can be a Server Component.

- [x] **24. `workers/freecad.worker.ts:60` — `require("glob")` in a TypeScript file**
  Uses CJS `require()` dynamically inside `resolveFreeCADPython()` for a package that is already a listed dependency. Should be a top-level ESM import.
