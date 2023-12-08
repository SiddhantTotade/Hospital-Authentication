import { useEffect, useState } from "react";
import { useVerifyEmailQuery } from "../services/authApiService";
import { GetEmailVerifyToken } from "../utils/getVerifyEmailToken";

export const useVerifyEmail = () => {
  const token = GetEmailVerifyToken();
  const { data, error, isLoading } = useVerifyEmailQuery(token);
  const [message, setMessage] = useState({ msg: "", error: false });

  useEffect(() => {
    if (error) {
      setMessage({ ...message, msg: error.data.error, error: true });
    }
    if (data) {
      setMessage({ ...message, msg: data.msg, error: false });
    }
  }, [error, data]);

  return { message, isLoading, error, data };
};
