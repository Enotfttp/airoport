import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import { getAirlines } from "../../controllers/AirlinesController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Airlines.module.sass";

const columns: GridColDef[] = [
  { field: "Name Complany", headerName: "Name Company" },
  { field: "Create Years", headerName: "Create Years" },
  { field: "Count Planes", headerName: "Count Planes" },
];

const Airlines: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const dataTable = await getAirlines();
      if (dataTable.length) {
        const res = dataTable.map((el: any) => ({
          ...el,
          createYears: dateConverter(el.createYears),
        }));
        setData(res);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen((openModal) => !openModal);
  }, []);

  return (
    <>
      <Header />
      <h2 className={styles.airlines_title}>Airlines</h2>
      <TableData columns={columns} openModal={open} handleClose={handleOpen}>
        {data.length &&
          data.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={styles.table_cell}
              onClick={handleOpen}>
              <TableCell align="left">{row.nameCompany}</TableCell>
              <TableCell align="left">{row.createYears}</TableCell>
              <TableCell align="left">{row.countPlanes}</TableCell>
            </TableRow>
          ))}
      </TableData>
    </>
  );
};
export default Airlines;
