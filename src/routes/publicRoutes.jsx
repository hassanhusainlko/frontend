// src/routes/publicRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Home from "../features/landing/Home.jsx";
import Login from "../features/auth/Login.jsx";
import Registration from "../features/auth/Registration.jsx";

export const PublicRoutes = (
  <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="register" element={<Registration />} />
  </Route>
);
