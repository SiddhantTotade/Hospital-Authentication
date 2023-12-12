import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";

import { CategorySchema } from "../schemas/app";
import { useRegisterCategoryMutation } from "../services/appApiServices";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface CategoryForm {
  category: string;
}

type CategorySchema = InferType<typeof CategorySchema>;

export const useRegisterCategory = () => {
  const { handleSubmit, control, reset } = useForm<CategorySchema>({
    resolver: yupResolver(CategorySchema),
  });
  const [registerCategory, { isLoading }] = useRegisterCategoryMutation();
  const [message, setMessage] = useState({ msg: "", error: false });
  const { getToken } = useAuth();

  const onSubmit = async (data: CategoryForm) => {
    try {
      const newData = { ...data, access: getToken()["access"] };
      await registerCategory(newData);

      setMessage({
        ...message,
        msg: "Successfully uploaded category",
        error: false,
      });
    } catch (error) {
      setMessage({ ...message, msg: "Failed to upload category", error: true });
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
