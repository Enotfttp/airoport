import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import styles from "./EditModal.module.sass";

interface IEditModal {
  handleEdit: (data: any) => void;
  onClose: () => void;
  isShow: boolean;
  data: any;
  fields: GridColDef[];
}

const EditModal: React.FC<IEditModal> = ({
  handleEdit,
  onClose,
  isShow,
  data,
  fields,
}) => {
  const [anyData, setAnyData] = React.useState<any>({});
  const setAnyDataFromModal = React.useCallback(
    (value: string | object, field: string) => {
      setAnyData((prev: { [key: string]: string | object }) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSave = React.useCallback(() => {
    Object.entries(data).forEach(([key, value]) => {
      if (!anyData[key]) anyData[key] = value;
    });
    handleEdit(anyData);
  }, [anyData, data, handleEdit]);

  if (!isShow) return null;
  return (
    <div className={styles.edit_modal}>
      {fields.map((el) => (
        <div key={el.field} className={styles["edit_modal-block"]}>
          <>
            {el.type === "string" && (
              <FormControl
                sx={{ m: 1, width: "50ch" }}
                variant="outlined"
                className={styles["edit_modal-block-string"]}>
                <InputLabel htmlFor="outlined-adornment-string">
                  {el.headerName}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-string"
                  type="text"
                  label={el.headerName}
                  autoComplete="off"
                  value={anyData[el.field] ?? data[el.field]}
                  onChange={(event) =>
                    setAnyDataFromModal(event.target.value, el.field)
                  }
                />
              </FormControl>
            )}
            {el.type === "number" && (
              <FormControl
                sx={{ m: 1, width: "50ch" }}
                variant="outlined"
                className={styles["edit_modal-block-number"]}>
                <InputLabel htmlFor="outlined-adornment-number">
                  {el.headerName}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-number"
                  type="text"
                  label={el.headerName}
                  autoComplete="off"
                  value={anyData[el.field] ?? data[el.field]}
                  onChange={(event) =>
                    setAnyDataFromModal(event.target.value, el.field)
                  }
                />
              </FormControl>
            )}
            {el.type === "date" && (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={styles["edit_modal-block-date"]}>
                <DatePicker />
              </LocalizationProvider>
            )}
            {el.type === "select" && Array.isArray(data[el.field]) && (
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className={styles["edit_modal-block-select"]}>
                <InputLabel id="demo-simple-select-standard-label">
                  {el.headerName}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={anyData[el.field] || data[el.field]?.[0]?.name}
                  onChange={(event) => {
                    setAnyDataFromModal(event.target.value, el.field);
                  }}
                  label={el.headerName}>
                  {data[el.field]?.map(
                    (item: { id: number; name: string }, index: number) =>
                      item.name !== anyData[el.field]?.name && (
                        <MenuItem value={item.name} key={`${item.id}${index}`}>
                          {item.name}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            )}
          </>
        </div>
      ))}
      <div className={styles["edit_modal-btn"]}>
        <Button
          variant="contained"
          size="medium"
          sx={{ width: "25ch" }}
          color="success"
          onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="contained"
          size="medium"
          sx={{ width: "25ch" }}
          onClick={onClose}>
          No
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EditModal);
