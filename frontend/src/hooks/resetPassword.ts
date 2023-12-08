import { useState } from "react";
import { InferType } from "yup";

import { ResetPasswordSchema } from "../schemas/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "../services/authApiService";
import { GetResetPasswordUrlData } from "../utils/getResetPasswordData";

interface ResetPasswordForm {
  password: string;
  password2: string;
}

type ResetPassworrdSchemaType = InferType<typeof ResetPasswordSchema>;

export const useResetPassword = () => {
  const { control, handleSubmit, reset } = useForm<ResetPassworrdSchemaType>({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const [message, setMessage] = useState({ msg: "", error: false });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const urlData = GetResetPasswordUrlData();

  const onSubmit = async (data: ResetPasswordForm) => {
    let res = {};
    try {
      const payload = { ...urlData, ...data };

      res = await resetPassword(payload);

      if (res.error) {
        setMessage({
          ...message,
          msg: res.error.data.error,
          error: true,
        });
      }
      if (res.data) {
        setMessage({ ...message, msg: res.data.msg, error: false });
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
  return { isLoading, control, handleSubmit, onSubmit, message };
};
