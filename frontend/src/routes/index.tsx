import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import RequestRegistrationCodePage from "../pages/auth/RequestRegistrationCode";
import EmailVerificationPage from "../pages/auth/EmailVerification";
import HomeWithAuth from "../pages/Home";
import { Blogs } from "../pages/app/Blogs";
import { SingleBlog } from "../pages/app/SingleBlog";
import { MyBlogs } from "../pages/app/MyBlogs";

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
    path: "/auth/request_code/",
    element: <RequestRegistrationCodePage />,
  },
  {
    path: "/auth/email_verify",
    element: <EmailVerificationPage />,
  },
  {
    path: "/auth/resend_email_verify",
    element: <EmailVerificationPage />,
  },
];

const appRoutes = [
  {
    path: "/app/blogs",
    element: <Blogs />,
  },
  {
    path: "/app/blogs/:url",
    element: <SingleBlog />,
  },
  {
    path: "/app/my-blogs/",
    element: <MyBlogs />,
  },
];

const router = createBrowserRouter([
  { path: "/", element: <HomeWithAuth /> },
  { path: "*", element: <h1>Page not found</h1> },
  ...authRoutes,
  ...appRoutes,
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
