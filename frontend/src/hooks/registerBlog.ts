import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectChangeEvent } from "@mui/material";

import { BlogSchema } from "../schemas/app";
import { useRegisterBlogMutation } from "../services/appApiServices";
import { resizeAndConvertToBase64 } from "../utils/convertImage";
import { useAuth } from "../context/AuthContext";
import { generateSlug } from "../utils/generateSlug";
import { useSelector } from "react-redux";

interface BlogSchemaForm {
  title: string;
  content: string;
  summary: string;
}

type BlogSchemaType = InferType<typeof BlogSchema>;

export const useRegisterBlog = () => {
  const { control, handleSubmit, reset } = useForm<BlogSchemaType>({
    resolver: yupResolver(BlogSchema),
  });
  const [message, setMessage] = useState({ msg: "", error: false });
  const [uploadBlog, { isLoading }] = useRegisterBlogMutation();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const userData = useSelector((state) => state["user"]);
  const { getToken } = useAuth();

  const handleCategory = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      const base64 = await resizeAndConvertToBase64(file, 500, 1);
      setImage(base64 as string);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: BlogSchemaForm) => {
    let res: any = {};

    try {
      const newData = {
        ...data,
        user: userData.id,
        category: category["id"],
        image: image,
        user_email: userData.email as string,
        user_first_name: userData.first_name as string,
        access: getToken()["access"],
        blog_slug: data.title + generateSlug(),
      };

      res = uploadBlog(newData);

      if (res.error) {
        setMessage({
          ...message,
          msg: res.error?.data?.non_field_errors?.[0],
          error: true,
        });
      }
      if (res.data) {
        console.log(res.data);
      }
    } catch (error) {
      setMessage({ ...message, msg: res.error });
    } finally {
      reset();
    }
  };

  return {
    control,
    handleSubmit,
    message,
    isLoading,
    onSubmit,
    handleImage,
    handleCategory,
    category,
  };
};
