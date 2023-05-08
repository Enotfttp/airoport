import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import { deleteFlight, getFlights } from "../../controllers/FlightController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Flights.module.sass";

const columns: GridColDef[] = [
  { field: "departure", headerName: "Departure", type: "date" },
  { field: "departureCiry", headerName: "Departure City", type: "string" },
  { field: "arrival", headerName: "Arrival", type: "data" },
  { field: "arrivalCiry", headerName: "Arrival Ciry", type: "string" },
  { field: "nameCompany", headerName: "Name Company", type: "select" },
  { field: "status", headerName: "status", type: "select" },
  { field: "fio", headerName: "FIO", type: "string" },
];

const Flights: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);

  const fetchData = React.useCallback(async () => {
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
  }, []);

  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback((currentData: any) => {
    setEditData(currentData);
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const handleDelete = React.useCallback(async () => {
    if (id) {
      const data = await deleteFlight(id);
      await fetchData();
      if (data) setOpen(false);
    }
  }, [fetchData, id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Header />
      <h2 className={styles.flights_title}>Flights</h2>
      <TableData
        columns={columns}
        openModal={open}
        data={editData}
        handleClose={handleOpen}
        handleEdit={handleEdit}
        handleDelete={handleDelete}>
        {data.length &&
          data.map((row: any) => (
            <>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={styles.table_cell}
                onClick={() => {
                  handleOpen(row.id);
                  handleSetCurrentData(row);
                }}>
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
