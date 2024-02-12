import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Inicio from "./views/inicio";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Ordenes from "./views/Ordenes";
import Productos from "./views/Productos";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/registro",
        element: <Registro />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Ordenes /> },
      {
        path: "/admin/productos",
        element: <Productos />,
      },
    ],
  },
]);

export default router;
