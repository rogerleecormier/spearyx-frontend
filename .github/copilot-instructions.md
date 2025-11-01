# AI Coding Agent Instructions for Spearyx Frontend

## Project Overview

Modern React TypeScript application for generating RACI (Responsible, Accountable, Consulted, Informed) matrices with AI assistance. Built with TanStack Start (SSR), TanStack Router, and shadcn/ui components.

## Prerequisites

- **Node.js 20+ or 22+ LTS** (required for Vite, TanStack Start, and dependencies)
- npm 9+ or compatible package manager

## Architecture & Data Flow

### Core Components

- **RACI Generator** (`/tools/raci-generator`): Main feature with AI inference, matrix editing, and multi-format exports
- **AI Integration**: Cloudflare Workers backend (`src/config/workers.ts`) - always uses production URLs for consistency
- **State Management**: React Query for server state, URL-based sharing with LZ-string compression
- **Routing**: File-based routing with TanStack Router, auto-generated `routeTree.gen.ts`
- **SSR Setup**: Entry points in `src/entry-client.tsx` (hydration) and `src/entry-server.tsx` (SSR handler)

### Key Data Structures

```typescript
// Core RACI types from src/types/raci.ts
interface RaciState {
  title: string;
  description: string;
  roles: Role[];
  tasks: Task[];
  matrix: Record<TaskId, Record<RoleName, RaciValue>>;
}
```

### Export System

Multiple export formats with lazy loading (`src/lib/raci/exports/`):

- PDF, Excel, PowerPoint, Word, PNG, SVG, CSV
- Heavy libraries split into separate Vite chunks for performance

## Development Workflow

### Essential Commands

```bash
npm install             # First-time setup - requires Node 20+
npm run dev             # Start dev server with hot reload
npm run generate:routes # Regenerate TanStack Router routes
npm run build          # Production build with SSR
npm run ci             # Full CI pipeline (lint + type-check + format + audit + build)
```

### Initial Setup

1. Ensure Node.js 20+ or 22+ is installed: `node --version`
2. Install dependencies: `npm install`
3. Generate routes: `npm run generate:routes` (if routes are out of sync)
4. Start dev server: `npm run dev`

### Route Generation

- `src/routeTree.gen.ts` is committed to repo (required for production)
- Run `npm run generate:routes` after adding/modifying routes
- Routes use file-based convention in `src/routes/`

## Code Patterns & Conventions

### Component Organization

```typescript
// src/components/brand/index.ts - Centralized exports
export { Logo } from './Logo';
export { Card, HeroCard } from './BrandCards';

// Usage: Import from index, not individual files
import { Logo, HeroCard } from '@/components/brand';
```

### AI Integration Pattern

```typescript
// Always use production worker URLs (src/config/workers.ts)
const workerUrl = getWorkerUrl('AI_RACI_GENERATOR'); // Never localhost
```

### Matrix Operations

```typescript
// Use utility functions from src/lib/raci/matrix.ts
import { addRoleToMatrix, removeTaskFromMatrix } from '@/lib/raci/matrix';

// Never manipulate matrix object directly - use provided utilities
const newMatrix = addRoleToMatrix(matrix, newRole);
```

### Validation & Schema

```typescript
// Use Zod schemas from src/lib/raci/schema.ts
import { RaciStateSchema } from '@/lib/raci/schema';

const validatedState = RaciStateSchema.parse(state);
```

### Lazy Loading

```typescript
// Use React.lazy with custom preload hooks (src/hooks/usePreload.ts)
const LazyExportButton = lazy(() => import('./LazyExportButton'));
```

## Build Configuration

### Vite Chunking Strategy

Heavy export libraries are manually chunked in `vite.config.ts`:

- `@react-pdf/renderer` → `export-pdf` chunk
- `exceljs` → `export-excel` chunk
- `@radix-ui/*` → `ui-vendor` chunk

### SSR Considerations

- TanStack Start handles SSR with Nitro (Cloudflare Pages preset)
- Server functions in `src/server/`
- Client-side code marked with `"use client"` directives
- Edge runtime compatible - no Node.js APIs in server code

## Design System

### Brand Components

Custom design system in `src/components/brand/`:

- Typography scale with semantic names (`Hero`, `Display`, `Title`, etc.)
- Card variants (`HeroCard`, `FeatureCard`, `GlassCard`, etc.)
- Consistent spacing and color tokens

### UI Components

shadcn/ui components in `src/components/ui/` with Tailwind CSS:

- All components use `class-variance-authority` for variants
- Consistent API with `cn()` utility for class merging

## Testing & Quality

### Validation Rules

- Each task must have exactly one Accountable (A)
- Each role/task combination allows multiple RACI values
- Matrix operations preserve data integrity

### Error Handling

- AI requests include specific error messages for common issues
- Worker timeouts configured for 60 seconds
- Graceful fallbacks for export failures

## Deployment

### Cloudflare Pages

- **Build Configuration**: TanStack Start with `target: 'cloudflare-pages'` in `vite.config.ts`
- **Auto-deployment**: Triggers on push to `main` branch
- **Build command**: `npm run build`
- **Output directory**: `dist` (configured in `wrangler.jsonc`)
- **Environment**: Edge runtime (Cloudflare Workers)
- **No app.config.ts**: Uses Vite config with inline TanStack Start options

### Build Output Structure

- `dist/_worker.js/` - Cloudflare Workers SSR bundle
- `dist/` - Static assets and client bundle
- `dist/_routes.json` - Cloudflare Pages routing config
- `dist/_headers` - Custom headers for assets

### Worker Integration

- AI services via `spearyx.com/api/raci-ai/`
- Supports both `spearyx.com` and `www.spearyx.com` domains
- Frontend always uses production worker URLs

## Common Pitfalls

1. **Don't modify `routeTree.gen.ts`** - Regenerate with `npm run generate:routes`
2. **Don't use localhost worker URLs** - Always production for AI consistency
3. **Don't manipulate matrix directly** - Use utility functions from `matrix.ts`
4. **Don't forget route regeneration** - Required after route file changes
5. **Don't import from individual component files** - Use index.ts exports

## Key Files for Understanding

- `src/routes/tools/raci-generator.tsx` - Main application logic
- `src/lib/raci/matrix.ts` - Core matrix operations
- `src/ai/adapter.ts` - AI integration patterns
- `src/lib/sharing/shareLink.ts` - URL sharing with compression
- `vite.config.ts` - Build optimization and chunking
