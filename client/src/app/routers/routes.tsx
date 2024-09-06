import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";
import React from "react";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesComponent;
