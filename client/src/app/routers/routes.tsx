import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";
import React from "react";
import CreatePassword from "../pages/auth/login/create-password";
import UserInfo from "../pages/user/user-info/user-info";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/forgot-password" element={<CreatePassword />} /> */}
      <Route path="/forgot-password:token" element={<CreatePassword />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/create-password/:token" element={<CreatePassword />} />
    </Routes>
  );
};

export default RoutesComponent;
