import { createRouter } from './router'
import { StrictMode } from 'react'
import { RouterProvider } from '@tanstack/react-router'

const router = createRouter()

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

export default App
