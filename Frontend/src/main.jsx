import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AccountPage } from "./pages/AccountPage.jsx";
import { ROUTES } from "./constants/route.js";
import Home from "./pages/Home.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import SigninPage from "./pages/SigninPage.jsx";
import InputOTPForm from "./pages/InputOTPForm.jsx";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: ROUTES.SIGNIN,
        element: <SigninPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <h1>Profile Page</h1>,
      },
      {
        path: ROUTES.NOTES,
        element: <NotesPage />,
      },
      {
        path: ROUTES.SETTING,
        element: <AccountPage />,
      },
      {
        path: ROUTES.VERIFYCODE,
        element: <InputOTPForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
