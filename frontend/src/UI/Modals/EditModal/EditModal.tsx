import React from "react";
import styles from "./EditModal.module.sass";

const EditModal: React.FC = () => {
  return <div className={styles.modal}>Edit</div>;
};

export default React.memo(EditModal);
