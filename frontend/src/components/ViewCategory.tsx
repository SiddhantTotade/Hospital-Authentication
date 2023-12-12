import { useState } from "react";

import PrirmaryButton from "./PrimaryButton";
import AppDialog from "./AppDialog";
import { CategoryTable } from "./CategoryTable";

export default function ViewCategory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PrirmaryButton onClick={() => setOpen(true)} label="View Category" />
      <AppDialog
        title="Upload Category"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CategoryTable />
      </AppDialog>
    </>
  );
}
