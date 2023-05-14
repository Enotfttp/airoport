import { TableCell, TableRow } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import { getAirlines } from "../../controllers/AirlinesController";
import { getEmployees } from "../../controllers/EmployeeController";
import {
  addFlight,
  deleteFlight,
  editFlight,
  getAircrafts,
  getEnters,
  getFlights,
  getStatuses,
} from "../../controllers/FlightController";
import {
  checkIsArrayDataFromModal,
  uniqArrayForModal,
} from "../../utills/dataUtil";
import {
  dateConverter,
  dateForAnswerToBackend,
  dateForModal,
} from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Flights.module.sass";

const columns: GridColDef[] = [
  { field: "departure", headerName: "Departure", type: "dateTime" },
  { field: "departureCiry", headerName: "Departure City", type: "string" },
  { field: "arrival", headerName: "Arrival", type: "dateTime" },
  { field: "arrivalCiry", headerName: "Arrival Ciry", type: "string" },
  { field: "nameCompany", headerName: "Name Company" },
  { field: "status", headerName: "status" },
  { field: "fio", headerName: "FIO" },
  { field: "plane", headerName: "Plane" },
  { field: "enter", headerName: "Enter" },
  { field: "nameCompanySelect", headerName: "Name Company", type: "select" },
  { field: "statusSelect", headerName: "Status", type: "select" },
  { field: "enterSelect", headerName: "Enter", type: "select" },
  { field: "planeSelect", headerName: "Plane", type: "select" },
  { field: "fioSelect", headerName: "FIO", type: "select" },
];

const Flights: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [dataStatuses, setDataStatuses] = React.useState([]);
  const [dataAirlines, setDataAirlines] = React.useState([]);
  const [dataEnters, setDataEnters] = React.useState([]);
  const [dataAircrafts, setDataAircrafts] = React.useState([]);
  const [dataEmployees, setDataEmployees] = React.useState([]);
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
  const fetchDataAircrafts = React.useCallback(async () => {
    const aircrafts = await getAircrafts();
    if (aircrafts.length) {
      setDataAircrafts(aircrafts);
    } else {
      setDataAircrafts([]);
    }
  }, []);

  const fetchDataEmployees = React.useCallback(async () => {
    const employee = await getEmployees();
    if (employee.length) {
      const res = employee.map((el: any) => ({
        id: el.id,
        name: el.fio,
      }));
      setDataEmployees(res);
    } else {
      setDataEmployees([]);
    }
  }, []);

  const fetchDataEnters = React.useCallback(async () => {
    const enters = await getEnters();
    if (enters.length) {
      setDataEnters(enters);
    } else {
      setDataEnters([]);
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
    fetchDataEnters();
    fetchDataAircrafts();
    fetchDataEmployees();
    if (dataTable.length) {
      const res = dataTable.map((el: any) => ({
        ...el,
        departure: dateForModal(el.departure, "dateTime"),
        arrival: dateForModal(el.arrival, "dateTime"),
      }));
      setData(res);
    } else {
      setData([]);
    }
  }, [
    fetchDataAircrafts,
    fetchDataAirlines,
    fetchDataEnters,
    fetchDataStatuses,
    fetchDataEmployees,
  ]);

  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback(
    (currentData: any) => {
      let newObj = uniqArrayForModal(dataStatuses, currentData, "status");
      newObj = uniqArrayForModal(dataAirlines, newObj, "nameCompany");
      newObj = uniqArrayForModal(dataEnters, newObj, "enter");
      newObj = uniqArrayForModal(dataAircrafts, newObj, "plane");
      newObj = uniqArrayForModal(dataEmployees, newObj, "fio");
      setEditData(newObj);
    },
    [dataAirlines, dataStatuses, dataEnters, dataAircrafts, dataEmployees]
  );

  const handleAdd = React.useCallback(
    (data: any) => {
      addFlight({
        departure: dateForAnswerToBackend(data.departure),
        arrival: dateForAnswerToBackend(data.arrival),
        departureCiry: data.departureCiry,
        arrivalCiry: data.arrivalCiry,
        idEnter: checkIsArrayDataFromModal(data.enterSelect),
        idPilot: checkIsArrayDataFromModal(data.fioSelect),
        idStatus: checkIsArrayDataFromModal(data.statusSelect),
        idAirline: checkIsArrayDataFromModal(data.nameCompanySelect),
        idPlane: checkIsArrayDataFromModal(data.planeSelect),
      });
      fetchData();
    },
    [fetchData]
  );

  const handleEdit = React.useCallback((data: any) => {
    editFlight({
      idFlight: data.id,
      departure: dateForAnswerToBackend(data.departure),
      arrival: dateForAnswerToBackend(data.arrival),
      departureCiry: data.departureCiry,
      arrivalCiry: data.arrivalCiry,
      idEnter: checkIsArrayDataFromModal(data.enterSelect),
      idPilot: checkIsArrayDataFromModal(data.fioSelect),
      idStatus: checkIsArrayDataFromModal(data.statusSelect),
      idAirline: checkIsArrayDataFromModal(data.nameCompanySelect),
      idPlane: checkIsArrayDataFromModal(data.planeSelect),
    });
    setOpen(false);
  }, []);

  const handleDelete = React.useCallback(async () => {
    if (id) {
      const data = await deleteFlight(id);
      await fetchData();
      if (data) setOpen(false);
    }
  }, [fetchData, id]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, open]);

  return (
    <>
      <Header />
      <h2 className={styles.flights_title}>Flights</h2>
      <TableData
        columns={columns}
        openModal={open}
        data={
          editData || {
            nameCompanySelect: dataAirlines,
            statusSelect: dataStatuses,
            enterSelect: dataEnters,
            planeSelect: dataAircrafts,
            fioSelect: dataEmployees,
          }
        }
        handleClose={handleOpen}
        handleEdit={handleEdit}
        handleAdd={handleAdd}
        handleDelete={handleDelete}>
        {data.length &&
          data.map((row: any, index) => (
            <>
              <TableRow
                key={`${row.id}${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={styles.table_cell}
                onClick={() => {
                  handleOpen(row.id);
                  handleSetCurrentData(row);
                }}>
                <TableCell align="left">
                  {dateConverter(row.departure, "dateTime")}
                </TableCell>
                <TableCell align="left">{row.departureCiry}</TableCell>
                <TableCell align="left">
                  {dateConverter(row.arrival, "dateTime")}
                </TableCell>
                <TableCell align="left">{row.arrivalCiry}</TableCell>
                <TableCell align="left">{row.nameCompany}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.fio}</TableCell>
                <TableCell align="left">{row.plane}</TableCell>
                <TableCell align="left">{row.enter}</TableCell>
              </TableRow>
            </>
          ))}
      </TableData>
    </>
  );
};
export default Flights;
