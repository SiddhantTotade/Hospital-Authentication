import * as Yup from "yup";

const title = Yup.string().required("Title is required");

const content = Yup.string().required("Content is required");

const summary = Yup.string().required("Summary is required");

const category = Yup.string().required("Category is required");

export const BlogSchema = Yup.object().shape({
  title,
  content,
  summary,
  category,
});

export const CategorySchema = Yup.object().shape({
  category,
});
