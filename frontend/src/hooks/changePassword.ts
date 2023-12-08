import { useState } from "react";
import { useForm } from "react-hook-form";
import type { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useChangeUserPasswordMutation } from "../services/authApiService";
import { ChangePasswordSchema } from "../schemas/auth";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "./logout";

interface ChangePasswordForm {
  password: string;
  password2: string;
}

type ChangePasswordSchemaType = InferType<typeof ChangePasswordSchema>;

export const useChangePassworrd = () => {
  const { control, handleSubmit, reset } = useForm<ChangePasswordSchemaType>({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const [changePassword, { isLoading }] = useChangeUserPasswordMutation();
  const [message, setMessage] = useState({ msg: "", error: false });
  const { getToken, logout } = useAuth();
  const changePasswordLogout = useLogout();
  const navigate = useNavigate();

  const onSubmit = async (payload: ChangePasswordForm) => {
    let res = {};

    try {
      res = await changePassword({ payload, access: getToken().access });

      if (res.error) {
        setMessage({
          ...message,
          msg: res.error.data.error,
          error: true,
        });
      }
      if (res.data) {
        setMessage({ ...message, msg: res.data.msg, error: false });
        logout();
        changePasswordLogout.onSubmit;
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      setMessage({
        ...message,
        msg: res.error.data.error,
        error: true,
      });
    } finally {
      reset();
    }
  };
  return { onSubmit, isLoading, message, control, handleSubmit };
};
