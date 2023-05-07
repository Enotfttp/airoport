import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import MiniModal from "../Modals/MiniModal/MiniModal";
import styles from "./TableData.module.sass";

interface ITable {
  columns: GridColDef[];
  children: any;
  handleAdd?: () => void;
  handleClose: () => void;
  openModal: boolean;
}
const TableData: React.FC<ITable> = ({
  columns,
  children,
  handleAdd,
  handleClose,
  openModal,
}) => {
  return (
    <div>
      <div className={styles.add_btn}>
        <Button
          onClick={handleAdd}
          variant="contained"
          color="success"
          size="large"
          sx={{ width: "25ch" }}>
          Add
        </Button>
      </div>
      <TableContainer component={Paper} className={styles.table}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((elem) => (
                <TableCell className={styles.table_cell}>
                  {elem.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
      <MiniModal open={openModal} handleClose={handleClose} />
    </div>
  );
};
export default React.memo(TableData);
