import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface AppAlertPropsType {
  message?: { msg: string; error: boolean };
}

export default function AppAlert({ message }: AppAlertPropsType) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message && message.msg) {
      enqueueSnackbar(message.msg, {
        variant: message.error ? "error" : "success",
      });
    }
  }, [message, enqueueSnackbar]);

  return <></>;
}
