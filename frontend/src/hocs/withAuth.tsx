import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { useLoginGoogle } from "../hooks/loginGoogle";
import { GetAuthCodeGoogle } from "../utils/getAuthCode";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const { code, state } = GetAuthCodeGoogle();
    const { isLoggedIn } = useAuth();
    const { handleLogin } = useLoginGoogle();

    useEffect(() => {
      if (!isLoggedIn) {
        window.location.href = "/auth/login";
      }
    }, [isLoggedIn]);

    useEffect(() => {
      handleLogin(state, code);
    }, []);

    return isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <AuthLayout>You are not logged in</AuthLayout>
    );
  };
};

export default withAuth;
