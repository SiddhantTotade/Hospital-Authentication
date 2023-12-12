import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
} from "@mui/material";
import { useGetCategoryQuery } from "../services/appApiServices";
import { useAuth } from "../context/AuthContext";

export const CategoryTable = () => {
  const { getToken } = useAuth();
  const { data } = useGetCategoryQuery(getToken()["access"]);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {data?.map((category, id) => (
            <TableRow key={id}>
              <TableCell align="center">{category.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
