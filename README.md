# Master — Mechanical Watch Collection & Atelier

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/)
[![WebGL2](https://img.shields.io/badge/WebGL2-Shader%20Pipeline-990000?logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&logoColor=white)](https://vercel.com/)

An architectural e-commerce showcase and bespoke configurator for Swiss mechanical timepieces. Designed with editorial horology aesthetics, fluid animations, custom WebGL2 lighting shaders, and an interactive timepiece customizer.

🔗 **[Live Demo](https://your-project.vercel.app)** *(Replace with your deployed Vercel URL)*

---

## 🌟 Portfolio Highlights

- **Bespoke Atelier 3D/Interactive Configurator**: Real-time rendering of case materials (316L Steel, Grade 5 Titanium, 18k Rose Gold), dial tones, strap pairings, and laser caseback engraving with instant price adjustments.
- **WebGL2 Procedural Light Shaders**: Ambient alpine mist and rayleigh scattering effects dynamically driven by cursor movement and light/dark theme state.
- **60fps Kinetic Experience**: Smooth inertia scrolling powered by Lenis combined with physics-based GSAP choreography.
- **Interactive Multi-Watch Comparator**: Side-by-side technical spec matrix comparing calibres, beat rates, dimensions, and chronometer certifications.
- **Production-Ready Architecture**: Strict TypeScript interfaces, zero bloat, mobile-responsive layouts, and full acquisition bag drawer workflow.

---

## ✨ Features

- **🏛️ Curated Horology Collection**
  - Explore hand-finished timepieces across multiple categories: **Chronograph**, **Diver**, **Dress**, **GMT**, and **Complications**.
  - Detailed reference cards showcasing calibres, movement frequencies, power reserves, water resistance, and dimensions.

- **🛠️ Bespoke Atelier Configurator**
  - Live interactive customization studio:
    - **Case Materials**: 316L Brushed Steel, Grade 5 Titanium, 18k Rose Gold.
    - **Dial Tones**: Champagne Sunray, Obsidian Matte, Forest Olive.
    - **Straps**: Espresso Calfskin, Integrated Metal Bracelet, Hand-Stitched Alligator.
    - **Custom Laser Engraving**: Caseback personalization up to 8 characters.
  - Real-time price delta recalculation and dynamic visual updates.

- **⚖️ Side-by-Side Timepiece Comparator**
  - Compare up to three timepieces side by side across technical specifications (calibre, beat rate, power reserve, case diameter, thickness, lug-to-lug, water resistance, and COSC accuracy).

- **🔍 Technical Inspection Modal**
  - Deep-dive view for each watch featuring high-resolution imagery, architectural highlights, calibre breakdown, and complete dimensional blueprints.

- **🎨 Ambient WebGL2 Shaders & Smooth Motion**
  - Procedural WebGL2 canvas rendering alpine light and mist effects responsive to cursor movement and theme.
  - Smooth inertia scrolling powered by **Lenis**.
  - Micro-interactions and stage transitions powered by **GSAP**.

- **🛍️ Acquisition Bag & Drawer**
  - Slide-out cart drawer tracking customized timepiece configurations, case engravings, line-item quantities, and subtotal calculation.

- **🌓 Dual Theme Experience**
  - Seamless toggle between light travertine editorial mode and obsidian dark horology mode, set in classical **Cormorant Garamond** and modern sans typography.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vitejs.dev/)
- **Styling**: CSS3 Design Tokens & CSS Custom Properties
- **Motion & Physics**: [GSAP 3](https://greensock.com/gsap/) & [Lenis](https://github.com/darkroomengineering/lenis)
- **Visuals**: WebGL2 Custom Shaders
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```text
watches/
├── public/                 # Static assets, fonts & favicons
├── src/
│   ├── assets/
│   │   └── images/         # High-resolution horological photography
│   ├── components/
│   │   ├── BagDrawer.tsx              # Acquisition cart drawer
│   │   ├── CompareModal.tsx           # Multi-watch specification comparator
│   │   ├── ConfiguredWatchStage.tsx   # Atelier bespoke watch visualizer
│   │   ├── MovementVideoPlaceholder.tsx # Movement craft & atelier showcase
│   │   ├── WatchDetailModal.tsx       # Watch specifications & blueprint modal
│   │   └── WatchImage.tsx             # Optimized image renderer with fallbacks
│   ├── data/
│   │   └── watches.ts      # Collection database, calibres, specs & options
│   ├── styles/
│   │   └── main.css        # Theme variables, typography & layout styles
│   ├── webgl/
│   │   ├── heroCanvas.ts   # WebGL2 alpine light/mist background shader
│   │   └── specsCanvas.ts  # WebGL2 technical backdrop canvas
│   ├── App.tsx             # Main application shell & state orchestration
│   └── main.tsx            # React application entrypoint
├── index.html              # HTML shell & font definitions
├── package.json            # Dependencies & build scripts
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment & SPA routing config
└── vite.config.ts          # Vite build pipeline
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm, yarn, or bun

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
```

---

## 🌐 Deploy to Vercel

The easiest way to deploy this project for your portfolio:

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Click **"Deploy"** (Vercel automatically detects Vite).
5. Copy your live URL and paste it into your portfolio and resume!

---

## 👨‍💻 Author

- **GitHub**: [@your-username](https://github.com/your-username)
- **Portfolio**: [your-portfolio.com](https://your-portfolio.com)
- **LinkedIn**: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
