import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import { state } from './store/store';
import Auth from './components/auth/auth';
import Error from './components/error/error';
import Registration from './components/auth/registration';


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/registration",
    element: <Registration />
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
    <ReduxProvider store={state}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode >,
)