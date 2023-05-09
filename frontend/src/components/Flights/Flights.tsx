import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import { getAirlines } from "../../controllers/AirlinesController";
import {
  deleteFlight,
  getFlights,
  getStatuses,
} from "../../controllers/FlightController";
import { uniqArrayForModal } from "../../utills/dataUtil";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Flights.module.sass";

const columns: GridColDef[] = [
  { field: "departure", headerName: "Departure", type: "date" },
  { field: "departureCiry", headerName: "Departure City", type: "string" },
  { field: "arrival", headerName: "Arrival", type: "date" },
  { field: "arrivalCiry", headerName: "Arrival Ciry", type: "string" },
  { field: "nameCompany", headerName: "Name Company", type: "select" },
  { field: "status", headerName: "status", type: "select" },
  { field: "fio", headerName: "FIO", type: "string" },
  { field: "nameCompanySelect", headerName: "Name Company", type: "select" },
  { field: "statusSelect", headerName: "Status", type: "select" },
];

const Flights: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [dataStatuses, setDataStatuses] = React.useState([]);
  const [dataAirlines, setDataAirlines] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);

  const fetchDataStatuses = React.useCallback(async () => {
    const statuses = await getStatuses();
    if (statuses.length) {
      setDataStatuses(statuses);
    } else {
      setDataStatuses([]);
    }
  }, []);

  const fetchDataAirlines = React.useCallback(async () => {
    const airlines = await getAirlines();
    if (airlines.length) {
      const res = airlines.map((el: any) => ({
        id: el.id,
        name: el.nameCompany,
      }));
      setDataAirlines(res);
    } else {
      setDataAirlines([]);
    }
  }, []);

  const fetchData = React.useCallback(async () => {
    const dataTable = await getFlights();
    fetchDataStatuses();
    fetchDataAirlines();
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
  }, [fetchDataAirlines, fetchDataStatuses]);

  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback(
    (currentData: any) => {
      let newObj = uniqArrayForModal(dataStatuses, currentData, "status");
      newObj = uniqArrayForModal(dataAirlines, newObj, "nameCompany");
      setEditData(newObj);
    },
    [dataAirlines, dataStatuses]
  );

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
