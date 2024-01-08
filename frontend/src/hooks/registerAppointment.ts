import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useRegisterAppointmentMutation } from "../services/appointmentApiServices";
import { useGoogleCalendar } from "./addEventToGoogleCalender";

export const useRegisterAppointment = () => {
  const [message, setMessage] = useState({ msg: "", error: false });
  const [date, setDate] = useState("");
  const [registerAppointment, { isLoading }] = useRegisterAppointmentMutation();
  const { addManualEvent } = useGoogleCalendar();
  const { getToken } = useAuth();

  const handleDate = (newValue) => {
    setDate(newValue);
  };

  const onSubmit = async ({ e, docId }) => {
    e.preventDefault();

    try {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
      const day = formattedDate.getDate().toString().padStart(2, "0");

      const formattedDateString = `${year}-${month}-${day}`;

      const newData = {
        date_of_appointment: formattedDateString,
        patient: localStorage.getItem("user_id"),
        doctor: docId,
        access: getToken()["access"],
      };

      console.log(newData);

      const res = await registerAppointment(newData);
      addManualEvent(res);
      setMessage({
        ...message,
        msg: "Appointment successfull",
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
    handleDate,
    date,
  };
};
