import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useLoginUserMutation } from "../services/authApiService";
import { LoginSchema } from "../schemas/auth";
import { useAuth } from "../context/AuthContext";
import { setUserToken } from "../features/authSlice";

interface LoginForm {
  email: string;
  password: string;
}

type LoginSchemaType = InferType<typeof LoginSchema>;

export const useLogin = () => {
  const { control, handleSubmit, reset } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema),
  });
  const [message, setMessage] = useState({ msg: "", error: false });
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokens = useSelector(
    (state: { auth: { [key: string]: string } }) => state.auth
  );

  const onSubmit = async (data: LoginForm) => {
    let res: { data?: { token: string }; error?: any } = {};

    try {
      res = await loginUser(data);

      if ("error" in res) {
        setMessage({
          ...message,
          msg: res.error?.data?.error?.non_field_errors?.[0],
          error: true,
        });
      }
      if ("data" in res) {
        storeToken(res.data?.token);
        dispatch(
          setUserToken({ access: tokens.access, refresh: tokens.refresh })
        );
        navigate("/");
      }
    } catch (error) {
      setMessage({
        ...message,
        msg: res.error?.data?.errors?.non_field_errors[0],
        error: true,
      });
    } finally {
      reset();
    }
  };

  return { control, handleSubmit, isLoading, message, onSubmit };
};
