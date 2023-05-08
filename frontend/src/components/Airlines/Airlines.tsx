import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import TableData from "../../UI/Table/TableData";
import {
  deleteAirline,
  getAirlines,
} from "../../controllers/AirlinesController";
import { dateConverter } from "../../utills/dateUtills";
import Header from "../Header/Header";
import styles from "./Airlines.module.sass";
import { TableCell, TableRow } from "@mui/material";

const columns: GridColDef[] = [
  { field: "nameCompany", headerName: "Name Company", type: "string" },
  { field: "createYears", headerName: "Create Years", type: "date" },
  { field: "countPlanes", headerName: "Count Planes", type: "number" },
];

const Airlines: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | undefined>(undefined);
  const [editData, setEditData] = React.useState<any>(null);

  const fetchData = React.useCallback(async () => {
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
  }, []);

  const handleOpen = React.useCallback((id?: string) => {
    setOpen((openModal) => !openModal);
    setId(id);
  }, []);

  const handleSetCurrentData = React.useCallback((currentData: any) => {
    setEditData(currentData);
  }, []);

  const handleEdit = React.useCallback((data: any) => {}, []);

  const handleDelete = React.useCallback(async () => {
    if (id) {
      const data = await deleteAirline(id);
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
      <h2 className={styles.airlines_title}>Airlines</h2>
      <TableData
        columns={columns}
        openModal={open}
        data={editData}
        handleEdit={handleEdit}
        handleClose={handleOpen}
        handleDelete={handleDelete}>
        {data.length &&
          data.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={styles.table_cell}
              onClick={() => {
                handleOpen(row.id);
                handleSetCurrentData(row);
              }}>
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
