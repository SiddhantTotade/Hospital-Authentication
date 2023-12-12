import { useState } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useGetCategoryQuery } from "../services/appApiServices";
import { useAuth } from "../context/AuthContext";

export default function BlogFilter({ onFilterChange }) {
  const { getToken } = useAuth();
  const { data } = useGetCategoryQuery(getToken()["access"]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
        input={<OutlinedInput label="Category" />}
      >
        <MenuItem value="All Categories">All Categories</MenuItem>
        {data?.map((category, id) => (
          <MenuItem key={id} value={category.id}>
            {category.category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
