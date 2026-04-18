import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRoutes } from "../routes/publicRoutes.jsx";
import { DashboardRoutes } from "../routes/dashboardRoutes.jsx";

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {PublicRoutes}
        {DashboardRoutes}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </Suspense>
  );
}
