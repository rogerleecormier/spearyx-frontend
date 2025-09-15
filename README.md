# Spearyx Frontend

A modern React application built with TanStack Start, featuring TypeScript, Tailwind CSS, and Shadcn UI components.

## Features

- ⚡ **TanStack Start** - Full-stack React framework with SSR and file-based routing
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom design system
- 🧩 **Shadcn UI** - Beautiful and accessible UI components
- 🔧 **TypeScript** - Type-safe development experience
- 🚀 **Vite** - Fast build tool and development server
- 🎯 **Custom Logo** - SVG logo with targeting reticle and spear design
- 🔄 **Server-Side Rendering** - SSR with route loaders and server functions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

4. Click "View SSR Demo" to see server-side rendering in action

## Project Structure

```plaintext
src/
├── components/          # Reusable UI components
│   ├── index.ts        # Component exports
│   ├── logo.tsx        # Spearyx logo component
│   └── ui/             # Shadcn UI components
├── lib/                # Utility functions and configurations
├── routes/             # TanStack Router routes
│   ├── __root.tsx      # Root route layout
│   ├── index.tsx       # Home page
│   ├── data.tsx        # SSR demo page
│   └── server-data.ts  # Server function simulation
├── main.tsx            # Application entry point
├── index.css           # Global styles and Tailwind imports
└── routeTree.gen.ts    # Auto-generated route tree
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Cloudflare (if configured)

## Adding Shadcn Components

To add new Shadcn UI components:

```bash
npx shadcn@latest add [component-name]
```

## Deployment

### Cloudflare Pages

This project is configured for automatic deployment to Cloudflare Pages through GitHub integration:

#### Setup Instructions:

1. **Connect Repository to Cloudflare Pages:**

   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:

   ```bash
   wrangler auth login
   ```

3. Create a `wrangler.toml` file in the project root:

   ```toml
   name = "your-project-name"
   compatibility_date = "2024-01-01"

   [build]
   command = "npm run build"

   [build.upload]
   format = "modules"
   ```

4. Deploy:

   ```bash
   wrangler pages deploy dist
   ```

## Best Practices

- Use TypeScript strict mode for better type safety
- Follow the file-based routing pattern for TanStack Router
- Use Shadcn UI components for consistent design
- Leverage Tailwind CSS utility classes
- Keep components small and focused on single responsibilities
