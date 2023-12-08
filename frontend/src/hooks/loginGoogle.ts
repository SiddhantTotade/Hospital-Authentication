import { useState } from "react";
import { useLoginUserGoogleMutation } from "../services/authApiService";
import { useAuth } from "../context/AuthContext";

export const useLoginGoogle = () => {
  const [message, setMessage] = useState({ msg: "", error: false });
  const [loginUserGoogle, { isLoading }] = useLoginUserGoogleMutation();
  const { isLoggedIn, login } = useAuth();

  const handleLogin = async (state: string, code: string) => {
    if (!isLoggedIn) {
      try {
        const res = await loginUserGoogle({ state, code });

        console.log(res);

        if (res.error) {
          setMessage({
            ...message,
            msg: res.error.data.non_field_errors[0],
            error: true,
          });
        }
        if (res.data) {
          login(res.data.token);
          setMessage({ ...message, msg: null, error: false });
        }
      } catch (error) {
        setMessage({ ...message, msg: "Error while logging in", error: true });
      }
    }
  };

  return { isLoading, message, handleLogin };
};
