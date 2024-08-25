import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store';
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
    path: "/",
    element: <App />
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode >,
)