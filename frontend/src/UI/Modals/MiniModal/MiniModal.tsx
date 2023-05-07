import Button from "@mui/material/Button";
import React from "react";
import styles from "./MiniModal.module.sass";

const MiniModal: React.FC<{ open?: boolean; handleClose: () => void }> = ({
  open = false,
  handleClose,
}) => {
  if (!open) return null;
  return (
    <>
      <div className={styles.body_bg}></div>
      <div className={styles.modal}>
        <div className={styles.group_btn}>
          <Button variant="contained" size="medium" sx={{ width: "12ch" }}>
            Edit
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{ width: "12ch" }}
            color="error">
            Delete
          </Button>
        </div>
        <div className={styles.close_btn}>
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    </>
  );
};

export default MiniModal;
