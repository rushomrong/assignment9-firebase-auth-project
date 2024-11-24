import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassword from "./components/Account/ForgetPassword/ForgotPassword";
import AdventureDetails from "./components/Account/PrivateRoute/Auth/AdventureDetails/AdventureDetails";
import { AuthProvider } from "./components/Account/PrivateRoute/Auth/AuthContext ";
import Dashboard from "./components/Account/PrivateRoute/Auth/Dashboard/Dashboard";
import UpdateProfile from "./components/Account/PrivateRoute/Auth/UserProfile/UpdateProfile";
import UserProfile from "./components/Account/PrivateRoute/Auth/UserProfile/UserProfile";
import PrivateRoute from "./components/Account/PrivateRoute/PrivateRoute";
import Error from "./components/ErrorPage/Error";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Root from "./components/Root";
import TalkWithExpert from "./components/TalkWithExpert/TalkWithExpert";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "TalkWithExpert",
        element: (
          <PrivateRoute>
            <TalkWithExpert />
          </PrivateRoute>
        ),
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "UserProfile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "AdventureDetails/:adventureId",
        element: (
          <PrivateRoute>
            <AdventureDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "ForgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "UpdateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "Dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
