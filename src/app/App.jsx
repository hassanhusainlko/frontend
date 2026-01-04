import React from "react";
import AppRoutes from "./routes.jsx";
import { useDispatch } from "react-redux";
import { loadFromStorage } from "../features/auth/authSlice.js";
import { useEffect } from "react";

export default function App() {
  return <AppRoutes />;
}
