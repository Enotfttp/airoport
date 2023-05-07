import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Header.module.sass";

const Header: React.FC = () => {
  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("role");
  };

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/flights">Flights</NavLink>
        <NavLink to="/employes">Employes</NavLink>
        <NavLink to="/airlines">Airlines</NavLink>
        <NavLink to="/" onClick={() => logout()} className={styles.logout}>
          <LogoutIcon /> 
        </NavLink>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
