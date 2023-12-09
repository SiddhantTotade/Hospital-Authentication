import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { isLoggedIn } = useAuth();

    useEffect(() => {
      if (!isLoggedIn) {
        window.location.href = "/auth/login";
      }
    }, [isLoggedIn]);

    return isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <AuthLayout>You are not logged in</AuthLayout>
    );
  };
};

export default withAuth;
