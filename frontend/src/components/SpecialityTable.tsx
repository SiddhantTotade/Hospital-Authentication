import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
} from "@mui/material";
import { useGetSpecialityQuery } from "../services/authApiService";
import { useAuth } from "../context/AuthContext";

export const SpecialityTable = () => {
  const { getToken } = useAuth();
  const { data } = useGetSpecialityQuery(getToken()["access"]);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {data?.map((speciality, id) => (
            <TableRow key={id}>
              <TableCell align="center">{speciality.speciality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
