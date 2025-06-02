import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home/index.tsx';
import ReadBook from './pages/ReadBook/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/read-book",
    Component: ReadBook
  },
]);

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
