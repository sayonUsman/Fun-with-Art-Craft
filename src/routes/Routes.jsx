import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Error_404 from "../pages/Error_404/Error_404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [{ path: "/", element: <Home></Home> }],
  },
  { path: "*", element: <Error_404></Error_404> },
]);

export default router;
