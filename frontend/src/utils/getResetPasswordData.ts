import { useEffect, useState } from "react";

export const GetResetPasswordUrlData = () => {
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const currentUrl = window.location.href;
    const pathSegments = currentUrl.split("/");

    const uid = pathSegments[5];
    const token = pathSegments[6];

    setUid(uid);
    setToken(token);
  }, []);

  return { uid: uid, token: token };
};
