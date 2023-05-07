import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Registr from "../Registration/Registr";
import ProtectedRouters from "./ProtectedRouters";
import Employees from "../Employees/Employees";
import Airlines from "../Airlines/Airlines";
import Flights from "../Flights/Flights";

const Routers: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registr" element={<Registr />} />
        <Route element={<ProtectedRouters />}>
          <Route path="/employes" element={<Employees />} />
          <Route path="/airlines" element={<Airlines />} />
          <Route path="/flights" element={<Flights />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default Routers;
