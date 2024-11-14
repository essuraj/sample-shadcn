import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ConfigHome from "./features/config/home";
import { LoginForm } from "./features/main/login/login-form";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    // path: "/",
    // // element: <App />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "/config",
    
    element: <ConfigHome />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
);
