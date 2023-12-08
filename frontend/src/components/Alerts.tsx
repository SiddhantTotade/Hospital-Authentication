import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface AppAlertPropsType {
  message: string;
}

export default function AppAlert({ message }: AppAlertPropsType) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message.msg) {
      enqueueSnackbar(message.msg, {
        variant: message.error ? "error" : "success",
      });
    }
  }, [message, enqueueSnackbar]);
}
