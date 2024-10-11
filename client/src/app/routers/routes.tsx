import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/login";
import React from "react";
import CreatePassword from "../pages/auth/login/create-password";
import UserInfo from "../pages/user/user-info/user-form";
import ForgotPassword from "../pages/auth/login/forgot-password";
import UserLayout from "../shared/layouts/user-layout";
import MainLayout from "../shared/layouts/main-layout";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      {/* User Layout routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="/forgot-password/:token" element={<ForgotPassword />} />
        <Route path="/create-password/:token" element={<CreatePassword />} />
      </Route>

      {/* Main Layout routes */}
      <Route path="/" element={<MainLayout />}>
        <Route path="user-info" element={<UserInfo />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
