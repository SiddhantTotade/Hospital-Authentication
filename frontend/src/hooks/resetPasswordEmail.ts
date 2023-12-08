import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useResetPasswordEmailMutation } from "../services/authApiService";
import { ResetPasswordEmailSchema } from "../schemas/auth";

interface ResetPasswordEmailForm {
  email: string;
}

type ResetPassworrdSchemaType = InferType<typeof ResetPasswordEmailSchema>;

export const useResetPasswordEmail = () => {
  const { control, handleSubmit, reset } = useForm<ResetPassworrdSchemaType>({
    resolver: yupResolver(ResetPasswordEmailSchema),
  });
  const [message, setMessage] = useState({ msg: "", error: false });
  const [resetPasswordEmail, { isLoading }] = useResetPasswordEmailMutation();

  const onSubmit = async (data: ResetPasswordEmailForm) => {
    let res = {};
    
    try {
      res = await resetPasswordEmail(data);

      if (res.error) {
        setMessage({
          ...message,
          msg: res.error.data.errors.non_field_errors[0],
          error: true,
        });
      } else if (res.data) {
        setMessage({ ...message, msg: res.data.msg, error: false });
      }
    } catch (error) {
      setMessage({
        ...message,
        msg: res.error.data.errors.non_field_errors[0],
        error: true,
      });
    } finally {
      reset();
    }
  };

  return { isLoading, control, handleSubmit, onSubmit, message };
};
