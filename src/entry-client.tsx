/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start';
import { createRouter } from './router';

const router = createRouter();

hydrateRoot(
  document.getElementById('app')!,
  // cast to unknown -> any to avoid conflicting nested @tanstack/router-core types
  <StartClient router={router as unknown as any} />
);
