import { Route } from "react-router-dom";
import RequireAuth from "../features/auth/RequireAuth.jsx";
import Layout from "../components/layout/Layout.jsx";
import DashboardHome from "../features/dashboard/DashboardHome.jsx";
import ProfilePage from "../features/profile/ProfilePage.jsx";
import MyCoupons from "../features/coupons/MyCoupons.jsx";
import QuoteRequest from "../features/quotes/QuoteRequest.jsx";
import OrderList from "../features/orders/OrderList.jsx";
import OrderDetails from "../features/orders/OrderDetails.jsx";
import CreateLatexOrder from "../features/orders/CreateLatexOrder.jsx";
import CreateDataAnalysisOrder from "../features/orders/CreateDataAnalysisOrder.jsx";
import PaymentPage from "../features/payments/PaymentPage.jsx";

export const DashboardRoutes = (
  <Route
    element={
      <RequireAuth>
        <Layout />
      </RequireAuth>
    }
  >
    {/* Dashboard home */}
    <Route path="dashboard" element={<DashboardHome />} />

    {/* Profile */}
    <Route path="dashboard/profile" element={<ProfilePage />} />

    {/* Coupons */}
    <Route path="dashboard/coupons" element={<MyCoupons />} />

    {/* Quote wizard */}
    <Route path="dashboard/quote-request" element={<QuoteRequest />} />

    {/* Orders */}
    <Route path="dashboard/orders" element={<OrderList />} />
    <Route path="dashboard/orders/:orderId" element={<OrderDetails />} />

    {/* Payment */}
    <Route path="dashboard/payment/:orderId" element={<PaymentPage />} />

    {/* Order creation — protected (was incorrectly exposed before) */}
    <Route path="orders/create-latex" element={<CreateLatexOrder />} />
    <Route path="orders/create-data-analysis" element={<CreateDataAnalysisOrder />} />
  </Route>
);
