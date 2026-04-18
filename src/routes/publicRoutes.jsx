import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Home from "../features/landing/Home.jsx";
import Login from "../features/auth/Login.jsx";
import Registration from "../features/auth/Registration.jsx";
import ActivateAccount from "../features/auth/ActivateAccount.jsx";
import PasswordReset from "../features/auth/PasswordReset.jsx";
import PasswordResetConfirm from "../features/auth/PasswordResetConfirm.jsx";

export const PublicRoutes = (
  <>
    {/* Landing page — with Nav + Footer */}
    <Route element={<Layout />}>
      <Route index element={<Home />} />
    </Route>

    {/* Auth pages — full-screen own layout, no Nav / Footer */}
    <Route path="login"                       element={<Login />} />
    <Route path="register"                    element={<Registration />} />
    <Route path="activate/:uid/:token"        element={<ActivateAccount />} />
    <Route path="forgot-password"             element={<PasswordReset />} />
    <Route path="reset-password/:uid/:token"  element={<PasswordResetConfirm />} />
  </>
);
