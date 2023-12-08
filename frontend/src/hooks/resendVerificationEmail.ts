import { useState, useEffect } from "react";
import { useLazyResendVerifyEmailQuery } from "../services/authApiService";

export const useResendVerificationEmail = () => {
  const [resendVerifyEmail, { isLoading, data, error }] =
    useLazyResendVerifyEmailQuery();
  const isVerifyLoading = isLoading;
  const [message, setMessage] = useState({ msg: "", error: false });

  useEffect(() => {
    if (error) {
      setMessage({ ...message, msg: error.data.error, error: true });
    }
    if (data) {
      setMessage({ ...message, msg: data.msg, error: false });
    }
  }, [error, data]);

  return { isVerifyLoading, message, resendVerifyEmail };
};
