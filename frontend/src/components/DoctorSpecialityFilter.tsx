import { useState } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useGetSpecialityQuery } from "../services/authApiService";
import { useAuth } from "../context/AuthContext";

export default function DoctorSpecilaityFilter({ onFilterChange }) {
  const { getToken } = useAuth();
  const { data } = useGetSpecialityQuery(getToken()["access"]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  const handleSpecialityChange = (event) => {
    const speciality = event.target.value;
    setSelectedSpeciality(speciality);
    onFilterChange(speciality);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="speciality-label">Speciality</InputLabel>
      <Select
        labelId="speciality-label"
        id="speciality-select"
        value={selectedSpeciality}
        onChange={handleSpecialityChange}
        input={<OutlinedInput label="Speciality" />}
      >
        <MenuItem value="All Speciality">All Speciality</MenuItem>
        {data?.map((speciality, id) => (
          <MenuItem key={id} value={speciality.id}>
            {speciality.speciality}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
