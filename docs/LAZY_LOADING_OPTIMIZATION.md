# Lazy Loading Optimization Guide

This guide explains how to optimize your TanStack Start application with advanced lazy loading techniques for better performance and user experience.

## 🚀 What We've Implemented

### 1. **Enhanced Dynamic Imports**

- **Before**: Basic `await import()` in button actions
- **After**: Optimized lazy loading with preloading and better error handling

### 2. **React.lazy() with Suspense**

- Proper code splitting at component level
- Graceful loading states
- Better bundle optimization

### 3. **Smart Preloading**

- Hover-based preloading for instant user experience
- Intersection Observer for viewport-based preloading
- Configurable delays and timeouts

### 4. **Vite Configuration Optimization**

- Manual chunk splitting for export libraries
- Separate chunks for heavy dependencies
- Optimized dependency pre-bundling

## 📁 New Files Created

### `src/components/raci/LazyExportButton.tsx`

Enhanced export button component with:

- Lazy loading with preloading
- Visual preload indicators
- Better error handling
- Hover-based module preloading

### `src/components/raci/OptimizedExportCenter.tsx`

Optimized export center with:

- Suspense boundaries
- Lazy-loaded export buttons
- Better loading states

### `src/hooks/usePreload.ts`

Custom hook for preloading with:

- Hover-based preloading
- Intersection Observer preloading
- Timeout management
- Preload status tracking

## 🔧 How to Use

### Option 1: Replace Existing ExportCenter

```typescript
// In your component
import { OptimizedExportCenter } from '../components/raci/OptimizedExportCenter';

// Replace ExportCenter with OptimizedExportCenter
<OptimizedExportCenter
  state={raciState}
  canvasRef={canvasRef}
  onStateImport={handleStateImport}
  validationErrors={validationErrors}
/>
```

### Option 2: Use Individual LazyExportButton

```typescript
import { LazyExportButton } from '../components/raci/LazyExportButton';

<LazyExportButton
  id="pdf"
  label="PDF Export"
  description="Professional document"
  icon={FileText}
  color="text-red-600 bg-red-50 hover:bg-red-100 border-red-200"
  importPath="../../lib/raci/exports/toPdf"
  exportFunction="downloadPdf"
  state={raciState}
  filename="raci.pdf"
  onExportStart={handleExportStart}
  onExportEnd={handleExportEnd}
  onExportError={handleExportError}
/>
```

### Option 3: Use Preload Hook Directly

```typescript
import { usePreload } from '../hooks/usePreload';

const MyComponent = () => {
  const { preloadOnHover, preloadOnIntersection } = usePreload();
  
  return (
    <div
      {...preloadOnHover('../../lib/raci/exports/toPdf')}
      {...preloadOnIntersection('../../lib/raci/exports/toPdf')}
    >
      Heavy export button
    </div>
  );
};
```

## 📊 Performance Benefits

### Bundle Size Reduction

- **PDF Export**: 1.5MB → Loaded only when needed
- **Excel Export**: 943KB → Loaded only when needed  
- **PowerPoint Export**: 372KB → Loaded only when needed
- **Word Export**: 358KB → Loaded only when needed

### Loading Experience

- **Initial Load**: Faster startup (no heavy libraries)
- **Hover Preloading**: Instant response when user hovers
- **Visual Feedback**: Green dots show preloaded modules
- **Graceful Fallbacks**: Loading states during module fetch

### Network Optimization

- **Code Splitting**: Separate chunks for each export type
- **Manual Chunks**: Optimized vendor library grouping
- **Pre-bundling**: Fast loading of core dependencies
- **Excluded Heavy Libs**: No pre-bundling of export libraries

## 🎯 Best Practices

### 1. **Preload Strategy**

```typescript
// Good: Preload on user intent (hover/focus)
{...preloadOnHover('path/to/export')}

// Better: Preload when component enters viewport
{...preloadOnIntersection('path/to/export', 0.1)}
```

### 2. **Error Handling**

```typescript
const handleExport = async () => {
  try {
    const module = await import(importPath);
    await module.exportFunction(state);
  } catch (error) {
    // Handle gracefully
    setError('Export failed. Please try again.');
  }
};
```

### 3. **Loading States**

```typescript
// Show loading during import
{isExporting ? <Loader2 className="animate-spin" /> : <Icon />}

// Show preloaded status
{isPreloaded(path) && <div className="preloaded-indicator" />}
```

## 🔍 Monitoring Performance

### Build Analysis

```bash
npm run build
# Check the chunk sizes in the output
# Look for separate export chunks
```

### Runtime Monitoring

```typescript
// Add to your component
useEffect(() => {
  console.log('Preloaded modules:', preloadedModules);
}, []);
```

## 🚨 Important Notes

### 1. **Import Path Resolution**

- Use relative paths from the component file
- Ensure paths match your actual file structure
- Test imports work correctly

### 2. **Error Boundaries**

- Wrap lazy components in error boundaries
- Handle import failures gracefully
- Provide fallback UI for failed loads

### 3. **TypeScript Support**

- Export functions must be properly typed
- Use `unknown` for dynamic imports when needed
- Maintain type safety with proper interfaces

## 🔄 Migration Guide

### Step 1: Update Vite Config

Your `vite.config.ts` now includes optimized chunk splitting.

### Step 2: Replace ExportCenter

```typescript
// Before
import { ExportCenter } from './ExportCenter';

// After  
import { OptimizedExportCenter } from './OptimizedExportCenter';
```

### Step 3: Test Export Functions

Ensure all export paths are correct and functions work as expected.

### Step 4: Monitor Performance

Check bundle sizes and loading times after implementation.

## 🎉 Results

After implementing these optimizations:

- ✅ **Faster initial load** (no heavy export libraries)
- ✅ **Better user experience** (hover preloading)
- ✅ **Smaller main bundle** (separate export chunks)
- ✅ **Visual feedback** (preload indicators)
- ✅ **Graceful fallbacks** (loading states)

Your application will now load much faster while providing a smooth export experience!
