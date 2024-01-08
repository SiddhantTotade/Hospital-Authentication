import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

import { SpecialitySchema } from "../schemas/app";
import { useUploadSpecialityMutation } from "../services/authApiService";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface SpecialityForm {
  speciality: string;
}

type SpecialitySchema = InferType<typeof SpecialitySchema>;

export const useUploadDoctorSpeciality = () => {
  const { handleSubmit, control, reset } = useForm<SpecialitySchema>({
    resolver: yupResolver(SpecialitySchema),
  });
  const [registerCategory, { isLoading }] = useUploadSpecialityMutation();
  const [message, setMessage] = useState({ msg: "", error: false });
  const { getToken } = useAuth();

  const onSubmit = async (data: SpecialityForm) => {
    try {
      const newData = { ...data, access: getToken()["access"] };
      await registerCategory(newData);

      setMessage({
        ...message,
        msg: "Successfully uploaded speciality",
        error: false,
      });
    } catch (error) {
      setMessage({
        ...message,
        msg: "Failed to upload speciality",
        error: true,
      });
    } finally {
      reset();
    }
  };

  return {
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    reset,
    message,
  };
};
