import { useState } from "react";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import { SpecialityTable } from "./SpecialityTable";

export default function ViewSpeciality() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrirmaryButton onClick={() => setOpen(true)} label="View Speciality" />
      <AppDialog
        title="Doctor Speciality"
        open={open}
        onClose={() => setOpen(false)}
      >
        <SpecialityTable />
      </AppDialog>
    </>
  );
}
