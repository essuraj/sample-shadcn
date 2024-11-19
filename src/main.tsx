import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const LoginForm = lazy(() => import("./features/main/login/login-form"));
const ConfigHome = lazy(() => import("./features/config/home"));
const App = lazy(() => import("./App"));

// Create a client
const queryClient = new QueryClient({defaultOptions:{queries:{retry:false,refetchOnWindowFocus:false}}});
const router = createBrowserRouter([
  {
    // path: "/",
    // // element: <App />,
    children: [
      {
        path: "",
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
     <QueryClientProvider client={queryClient}>
      
    <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
