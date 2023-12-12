import { useState } from "react";
import { useToggleDraftMutation } from "../services/appApiServices";
import { useAuth } from "../context/AuthContext";

export const useToggleDraft = () => {
  const [message, setMessage] = useState({ msg: "", error: false });
  const [toggleDraft, { isLoading }] = useToggleDraftMutation();
  const { getToken } = useAuth();

  const onSubmit = async (data: string) => {
    try {
      await toggleDraft({ id: data, access: getToken()["access"] });

      setMessage({
        ...message,
        msg: "Successfully marked",
        error: false,
      });
    } catch (error) {
      setMessage({ ...message, msg: "Failed to mark draft", error: true });
    }
  };

  return { onSubmit, isLoading, message };
};
