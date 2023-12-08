import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import ChangePasswordPage from "../pages/auth/ChangePassword";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import EmailVerificationPage from "../pages/auth/EmailVerification";
import HomeWithAuth from "../pages/Home";

type Route = RouteObject[] | RouteObject;

const authRoutes: Route = [
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/auth/forgot/password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/auth/email_verify",
    element: <EmailVerificationPage />,
  },
  {
    path: "/auth/resend_email_verify",
    element: <EmailVerificationPage />,
  },
  {
    path: "/auth/reset-password/:uid/:token",
    element: <ResetPasswordPage />,
  },
];

const router = createBrowserRouter([
  { path: "/", element: <HomeWithAuth /> },
  { path: "*", element: <h1>Page not found</h1> },
  ...authRoutes,
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
