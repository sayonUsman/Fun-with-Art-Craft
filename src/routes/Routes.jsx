import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Error_404 from "../pages/Error_404/Error_404";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Dashboard from "../pages/Dashboard/Dashboard";
import Secondary from "../layouts/Secondary";
import Payment from "../pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/instructors", element: <Instructors></Instructors> },
      { path: "/classes", element: <Classes></Classes> },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Secondary></Secondary>,
    children: [
      { path: "/dashboard", element: <Dashboard></Dashboard> },
      { path: "payments", element: <Payment></Payment> },
    ],
  },
  { path: "*", element: <Error_404></Error_404> },
]);

export default router;
