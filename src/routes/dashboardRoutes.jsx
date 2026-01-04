import React from "react";
import { Route } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth.jsx";
import Dashboard from "../features/dashboard/Dashboard.jsx";
import CreateLatexOrder from "../features/orders/CreateLatexOrder.jsx";
import CreateDataAnalysisOrder from "../features/orders/CreateDataAnalysisOrder.jsx";
import Layout from "../components/layout/Layout.jsx";
import OrderDetails from "../features/orders/OrderDetails.jsx";
import V3Card from "../services/CashfreeCard.jsx";

export const DashboardRoutes = (
  <>
    <Route element={<Layout />}>
      <Route
        path="dashboard/*"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      ></Route>

      <Route path="orders/create-latex" element={<CreateLatexOrder />} />
      <Route
        path="orders/create-data-analysis"
        element={<CreateDataAnalysisOrder />}
      />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/pay-token" element={<V3Card />} />
    </Route>
  </>
);
