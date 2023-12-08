import { useState } from "react";

export const GetAuthCodeGoogle = () => {
  const [code, setCode] = useState("");
  const [state, setState] = useState("");

  const currentUrl = new URL(window.location.href);

  if (currentUrl.searchParams.has("state")) {
    const stateValue = currentUrl.searchParams.get("state");
    if (stateValue && state !== stateValue) {
      setState(() => stateValue);
    }
  }

  if (currentUrl.searchParams.has("code")) {
    const codeValue = currentUrl.searchParams.get("code");
    if (codeValue && code !== codeValue) {
      setCode(() => codeValue);
    }
  }

  return { code, state };
};
