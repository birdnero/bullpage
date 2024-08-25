import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './components/auth/auth';
import Error from './components/error/error';


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/denied",
    element: <Error />
  },
  {
    path: "/*",
    element: <Error />,
  },
  {
    path: "/error",
    element: <Error />
  },
  {
    path: "/home",
    element: <App />
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode >,
)