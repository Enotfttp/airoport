import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Header.module.sass";

const Header: React.FC = () => {
  const [fio, setFio] = React.useState("");
  const [isShow, setShow] = React.useState(false);

  const logout = React.useCallback(() => {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("fio");
  }, []);

  const handleClick = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const fullName = localStorage.getItem("fio");
    setFio(fullName || "");
  }, [fio]);

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/flights">Flights</NavLink>
        <NavLink to="/employes">Employees</NavLink>
        <NavLink to="/airlines">Airlines</NavLink>
        <button onClick={handleClick} className={styles.fullName}>
          {fio}
        </button>
        {isShow && (
          <div className={styles.logout_modal}>
            <NavLink to="/" onClick={() => logout()} className={styles.logout}>
              <LogoutIcon /> <span>Выйти</span>
            </NavLink>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Header;
