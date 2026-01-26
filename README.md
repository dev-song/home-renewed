# Interactive Frontend Developer Portfolio

A unique, interactive portfolio project built with **React**, **TypeScript**, and **Vite**. This project showcases frontend development skills through multiple interactive "stages" and a professional standard resume view.

## 🚀 Features

### 🎮 Interactive Mode

The portfolio guides visitors through three distinct stages, each offering a unique way to view the resume data:

- **Stage 1: JSON Viewer**
  - Explore the raw resume data in a fully functional JSON editor.
  - Features syntax highlighting, search functionality, and minification/beautification.
  - Includes multiple themes (VSCode, GitHub, Monokai, etc.) for a personalized reading experience.

- **Stage 2: Terminal Interface**
  - A simulated developer terminal environment.
  - Interactive command-line experience with theme support (Dark, Light, High Contrast, etc.).
  - Includes a progress bar with trivia and easter eggs.

- **Stage 3: 3D Visualization**
  - An interactive 3D scene built with **React Three Fiber**.
  - Visualizes portfolio sections as interactive voxel cubes.
  - Color-coded sections:
    - 🔵 **Blue**: Hero & About
    - 🟢 **Green**: Experience
    - 🟡 **Yellow**: Skills
    - 🔴 **Red**: Projects
    - 🟣 **Purple**: Education & Certificates
    - ⚪ **White**: Contact

### 📄 Standard Mode

- A clean, professional resume layout suitable for traditional viewing.
- Optimized for readability and print.

### 🌐 Internationalization

- Full support for **English** and **Korean** languages, toggleable at any time.

### 📄 PDF Export

- Easily download the resume as a PDF.

## 🛠 Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **3D & Animation**: @react-three/fiber, @react-three/drei, Three.js
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React
- **Utilities**: @uiw/react-json-view

## 📦 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- pnpm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/dev-song/home-renewed.git
    cd home-renewed
    ```

2.  Install dependencies:

    ```bash
    pnpm install
    ```

3.  Start the development server:

    ```bash
    pnpm dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 🏗 Project Structure

```
src/
├── components/     # Reusable UI components
├── data/           # Resume data (resumeData.ts)
├── pages/
│   ├── interactive/ # Interactive stages (Stage1, Stage2, Stage3)
│   └── standard/    # Standard resume view
├── store/          # Zustand state stores (language, etc.)
└── ...
```

## 📜 Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the project for production.
- `pnpm preview`: Preview the production build locally.
- `pnpm lint`: Run ESLint.
- `pnpm analyze`: Analyze the bundle size.

## 📄 License

[MIT](LICENSE.md)
