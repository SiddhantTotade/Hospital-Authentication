import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRequestRegistrationCodeMutation } from "../services/authApiService";
import { RequestRegistrationCodeSchema } from "../schemas/auth";

interface RequestRegistrationCodeForm {
  email: string;
}

type ResetPassworrdSchemaType = InferType<typeof RequestRegistrationCodeSchema>;

export const useRequestRegistrationCode = () => {
  const { control, handleSubmit, reset } = useForm<ResetPassworrdSchemaType>({
    resolver: yupResolver(RequestRegistrationCodeSchema),
  });
  const [message, setMessage] = useState({ msg: "", error: false });
  const [requestCode, { isLoading }] = useRequestRegistrationCodeMutation();

  const onSubmit = async (data: RequestRegistrationCodeForm) => {
    let res: { data?: { token: string; msg: string }; error?: any } = {};

    try {
      res = await requestCode(data);

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
