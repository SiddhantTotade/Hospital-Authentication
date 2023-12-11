import { useState } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { BlogSchema } from "../schemas/app";
import { useRegisterBlogMutation } from "../services/appApiServices";

interface BlogSchemaForm {
  title: string;
  content: string;
  summary: string;
  category: string;
}

type BlogSchemaType = InferType<typeof BlogSchema>;

export const useRegisterBlog = () => {
  const { control, handleSubmit, reset } = useForm<BlogSchemaType>({
    resolver: yupResolver(BlogSchema),
  });
  const [message, setMessage] = useState({ msg: "", error: false });
  const [uploadBlog, { isLoading }] = useRegisterBlogMutation();
  const [image, setImage] = useState("");
  const tokens = useSelector(
    (state: { auth: { [key: string]: string } }) => state.auth
  );

  const onSubmit = async (data: BlogSchemaForm) => {
    let res: { data?: { token: string; msg: string }; error?: any } = {};

    try {
      res = uploadBlog(data);

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

  return { control, handleSubmit, message, isLoading, onSubmit };
};
