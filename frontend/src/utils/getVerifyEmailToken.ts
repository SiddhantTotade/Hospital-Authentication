import { useEffect, useState } from "react";

export const GetEmailVerifyToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const currentPath = window.location.search;
    const tokenData = new URLSearchParams(currentPath).get("token");

    setToken(tokenData);
  }, []);

  return token;
};
