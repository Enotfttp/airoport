import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import styles from "./EditModal.module.sass";

const EditModal: React.FC = () => {
  return (
    <div className={styles.modal}>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
};

export default EditModal;
