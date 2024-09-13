import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";
import React from "react";
import CreatePassword from "../pages/auth/login/create-password";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<CreatePassword />} />
      <Route path="/create-password/:token" element={<CreatePassword />} />
    </Routes>
  );
};

export default RoutesComponent;
