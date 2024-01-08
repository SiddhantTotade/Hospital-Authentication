import * as Yup from "yup";

const title = Yup.string().required("Title is required");

const content = Yup.string().required("Content is required");

const summary = Yup.string().required("Summary is required");

const category = Yup.string().required("Category is required");

const speciality = Yup.string().required("Speciality is required");

const fromTime = Yup.string().required("From time is required");
const toTime = Yup.string().required("To time is required");

export const BlogSchema = Yup.object().shape({
  title,
  content,
  summary,
});

export const CategorySchema = Yup.object().shape({
  category,
});

export const SpecialitySchema = Yup.object().shape({
  speciality,
});

export const DoctorDetailSchema = Yup.object().shape({
  speciality,
  fromTime,
  toTime,
});
