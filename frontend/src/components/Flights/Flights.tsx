import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import { getFlights } from "../../controllers/FlightController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Flights.module.sass";

const columns: GridColDef[] = [
  { field: "departure", headerName: "Departure" },
  { field: "departureCiry", headerName: "Departure City" },
  { field: "arrival", headerName: "Arrival" },
  { field: "arrivalCiry", headerName: "Arrival Ciry" },
  { field: "nameCompany", headerName: "Name Company" },
  { field: "status", headerName: "status" },
  { field: "fio", headerName: "FIO" },
];

const Flights: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const dataTable = await getFlights();
      if (dataTable.length) {
        const res = dataTable.map((el: any) => ({
          ...el,
          departure: dateConverter(el.departure),
          arrival: dateConverter(el.arrival),
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
      <h2 className={styles.flights_title}>Flights</h2>
      <TableData columns={columns} openModal={open} handleClose={handleOpen}>
        {data.length &&
          data.map((row: any) => (
            <>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={styles.table_cell}
                onClick={handleOpen}>
                <TableCell align="left">{row.departure}</TableCell>
                <TableCell align="left">{row.departureCiry}</TableCell>
                <TableCell align="left">{row.arrival}</TableCell>
                <TableCell align="left">{row.arrivalCiry}</TableCell>
                <TableCell align="left">{row.nameCompany}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.fio}</TableCell>
              </TableRow>
            </>
          ))}
      </TableData>
    </>
  );
};
export default Flights;
