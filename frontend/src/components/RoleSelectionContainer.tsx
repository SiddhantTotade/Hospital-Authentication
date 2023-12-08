import { useState } from "react";
import PrirmaryButton from "./PrimaryButton";

export default function RoleSelectionContainer() {
  const [loginUser, setLoginUser] = useState({
    doctor: false,
    patient: false,
  });
  return (
    <>
      {["Doctor", "Patient"].map((user, id) => (
        <PrirmaryButton
          key={id}
          sx={{
            display: loginUser.doctor || loginUser.patient ? "none" : "",
          }}
          label={`Login as ${user}`}
          onClick={() => {
            user === "Doctor"
              ? setLoginUser({ ...loginUser, doctor: true })
              : setLoginUser({ ...loginUser, patient: true });
          }}
        />
      ))}
      ;
    </>
  );
}
