import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';

import { createRouter } from './router';

const router = createRouter();

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
