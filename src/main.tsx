import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import { state } from './store/store';

import App from './components/App';
import Error from './components/error/error';
import Body from './components/home/body';
import Posts from './components/home/posts/posts';
import CreatePost from './components/home/posts/create_post/create_post';



const router = createBrowserRouter([
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
    element: <App />,
    children: [
      { path: "", element: <Body /> },
      { path: "posts", element: <Posts /> },
      { path: "create_post", element: <CreatePost /> },
      { path: "my_posts", element: <></> }
    ]

  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={state}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode >,
)