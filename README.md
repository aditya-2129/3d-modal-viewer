# AutoQuotation — 3D CAD Analysis & Viewer

AutoQuotation is a modern, high-performance web application designed for rapid 3D CAD model analysis and manufacturing quotation. It allows users to upload STEP/STP files, visualize them in real-time using WebAssembly, and perform deep geometric analysis to identify parts, stock shapes, and manufacturing requirements.

![Architecture Diagram](https://img.shields.io/badge/Architecture-Next.js%2016%20+%20FreeCAD%20+%20Three.js-blue)
![License](https://img.shields.io/badge/License-Private-red)

## 🚀 Key Features

- **Instant 3D Rendering**: Client-side STEP to mesh tessellation using `occt-import-js` (WASM) for buttery-smooth performance.
- **Deep Geometric Analysis**: Automated part extraction and classification using FreeCAD's robust Open Cascade engine.
- **Stock Shape Detection**: Intelligently classifies parts into Round, Hex, or Rectangular stock based on principal moments of inertia and face analysis.
- **Part Tree Visualization**: Interactive split-pane view showing the hierarchical structure of complex assemblies.
- **Cloud Integration**: Powered by Appwrite for secure file storage and metadata management.
- **Deployment Ready**: Optimized for Coolify/Nixpacks with custom configuration.

## 🏗️ Architecture

### Frontend (Client-Side)
- **Framework**: Next.js 16 (App Router)
- **3D Engine**: `@react-three/fiber` + `three.js`
- **WASM Processing**: `occt-import-js` for browser-based STEP parsing.
- **UI Components**: Custom vanilla CSS for premium aesthetics and flexibility.

### Backend (Server-Side)
- **API Routes**: Next.js Serverless functions for handling file uploads and triggering analysis.
- **Geometry Engine**: FreeCAD (Python) integrated via sub-processes to handle complex CAD kernels.
- **Extraction Script**: `scripts/extract_parts.py` handles the heavy lifting of traversing assemblies and calculating geometric properties.

### Storage & Database
- **Backend-as-a-Service**: Appwrite for managing model files, analysis results, and project metadata.

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v20 or later
- **FreeCAD**: v1.1 (required for the analysis engine)
- **Appwrite**: A running instance (cloud or self-hosted)

### Environment Setup
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
FREECAD_PYTHON=C:\Program Files\FreeCAD 1.1\bin\python.exe  # Update path for Linux/macOS
```

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:4000](http://localhost:4000).

## 📁 Project Structure

- `src/app/` — Next.js pages and API routes.
- `src/components/` — Reusable React components (3D Viewer, Parts List, etc.).
- `scripts/` — Python scripts for FreeCAD geometry processing.
- `public/lib/` — WASM binaries for `occt-import-js`.
- `freecad_docs/` — Technical documentation for the FreeCAD API integration.

## 🚢 Deployment

The project is configured for deployment using **Nixpacks**. A `nixpacks.toml` is included to handle the specific build requirements of Next.js and the Python environment.

```bash
# Build the project
npm run build

# Start production server
npm run start
```

---

*Note: This is an experimental project focused on bridging the gap between CAD geometry and automated manufacturing workflows.*

