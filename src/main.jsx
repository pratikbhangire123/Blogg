import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import setupStore from "./redux/store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddArticle,
  AllArticles,
  Article,
  EditArticle,
  Home,
  Login,
  SignUp,
} from "./pages/index.js";
import { AuthLayout } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/all-articles",
        element: (
          <AuthLayout authentication>
            <AllArticles />
          </AuthLayout>
        ),
      },
      {
        path: "/add-article",
        element: (
          <AuthLayout authentication>
            <AddArticle />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-article/:slug",
        element: (
          <AuthLayout authentication>
            <EditArticle />
          </AuthLayout>
        ),
      },
      {
        path: "article/:slug",
        element: <Article />,
      },
    ],
  },
]);

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
