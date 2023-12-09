import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

const excludedKeys = ["profile_pic", "user_type", "is_verified"];

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default function UserDataTable() {
  const userData = useSelector((state) => state.user);
  const keysToShow = Object.keys(userData).filter(
    (key) => !excludedKeys.includes(key)
  );

  return (
    <TableContainer sx={{ width: "60%" }}>
      <Table>
        <TableBody>
          {keysToShow.map((key) => (
            <TableRow key={key}>
              <TableCell align="center">
                {capitalizeFirstLetter(key.replace(/_/g, " "))}
              </TableCell>
              <TableCell align="center">{userData[key]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
