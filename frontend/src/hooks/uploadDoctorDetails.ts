import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";

import { useUploadDoctorSpecialityMutation } from "../services/authApiService";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

export const useUploadDoctorDetails = () => {
  const [message, setMessage] = useState({ msg: "", error: false });
  const [fromValue, setFromValue] = useState<Dayjs | null>(
    dayjs("2024-01-01T00:00")
  );
  const [toValue, setToValue] = useState<Dayjs | null>(
    dayjs("2024-01-01T00:00")
  );
  const [uploadBlog, { isLoading }] = useUploadDoctorSpecialityMutation();
  const [speciality, setSpeciality] = useState("");
  const userData = useSelector((state) => state["user"]);
  const { getToken } = useAuth();

  const handleSpeciality = (e: SelectChangeEvent) => {
    setSpeciality(e.target.value);
  };

  const handleFromTime = (newValue) => {
    setFromValue(newValue);
  };

  const handleToTime = (newValue) => {
    setToValue(newValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        doctor: userData.id,
        speciality: speciality,
        from_time: fromValue.format("HH:mm:ss"),
        to_time: toValue.format("HH:mm:ss"),
        access: getToken()["access"],
      };

      await uploadBlog(newData);

      setMessage({
        ...message,
        msg: "Details uploaded successfully",
        error: false,
      });
    } catch (error) {
      setMessage({ ...message, msg: "Failed to upload detail", error: true });
    }
  };

  return {
    message,
    isLoading,
    onSubmit,
    handleSpeciality,
    handleFromTime,
    handleToTime,
    speciality,
    fromValue,
    toValue,
  };
};
