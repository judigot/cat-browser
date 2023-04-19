import React from "react";

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";

import CatBrowser from "./components/CatBrowser";
import CatInfo from "./components/CatInfo";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CatBrowser />,
    },
    {
      path: "/:catID",
      element: <CatInfo />,
    },
    {
      path: "/*", // 404
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<>Loading...</>} />;
}
