import Container from "react-bootstrap/Container";

import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CatBrowser from "./components/Homepage";

import CatInfo from "./components/SingleCatPage";

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

  return (
    <div style={{ padding: "2rem" }}>
      <Container>
        <RouterProvider router={router} fallbackElement={<>Loading...</>} />
      </Container>
    </div>
  );
}
