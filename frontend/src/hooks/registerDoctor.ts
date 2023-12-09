import { useState } from "react";
import { useForm } from "react-hook-form";
import type { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegistrationSchemaDoctor } from "../schemas/auth";
import { useRegisterUserMutation } from "../services/authApiService";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { resizeAndConvertToBase64 } from "../utils/convertImage";

interface RegistrationDoctorForm {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
  address: string;
  city: string;
  state: string;
  pincode: number;
}

type RegistrationSchemaType = InferType<typeof RegistrationSchemaDoctor>;

export const useRegisterDoctor = () => {
  const { control, handleSubmit, reset } = useForm<RegistrationSchemaType>({
    resolver: yupResolver(RegistrationSchemaDoctor),
  });
  const [messageDoctor, setMessageDoctor] = useState({ msg: "", error: false });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [image, setImage] = useState("");
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.auth);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    try {
      const base64 = await resizeAndConvertToBase64(file);
      setImage(base64);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: RegistrationDoctorForm) => {
    let res = {};

    try {
      const newData = { ...data, user_type: 2, profile_pic: image };
      res = await registerUser(newData);

      if (res.error) {
        setMessageDoctor({
          ...messageDoctor,
          msg: res.error.data.non_field_errors[0],
          error: true,
        });
      }
      if (res.data) {
        storeToken(res.data.token);
        dispatch(
          setUserToken({ access: tokens.access, refresh: tokens.refresh })
        );
        setMessageDoctor({ ...messageDoctor, msg: res.data.msg, error: false });
        setTimeout(() => {
          navigate("/");
        }, 6000);
      }
    } catch (error) {
      setMessageDoctor({
        ...messageDoctor,
        msg: res.error.data.non_field_errors[0],
        error: true,
      });
    } finally {
      reset();
    }
  };

  return {
    control,
    handleSubmit,
    isLoading,
    messageDoctor,
    onSubmit,
    handleImage,
  };
};
