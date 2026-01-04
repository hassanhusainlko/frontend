import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client"; // axios instance
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  // bootstrap: try to fetch current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const resp = await client.get("/auth/me");
        setUser(resp.data.user || resp.data);
      } catch (err) {
        // token might be invalid — remove
        console.warn("Could not fetch user:", err?.response?.status);
        localStorage.removeItem("access_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async ({ email, password }) => {
    // returns user on success, throws on error
    const resp = await client.post(
      "/auth/jwt/create",
      { email, password },
      { withCredentials: true }
    );
    const { access_token, user: userPayload } = resp.data;
    if (access_token) {
      localStorage.setItem("access_token", access_token);
      client.defaults.headers.Authorization = `Bearer ${access_token}`;
    }
    const newUser = userPayload || resp.data;
    setUser(newUser);
    queryClient.invalidateQueries(); // refetch any user-specific data
    return newUser;
  };

  const logout = async () => {
    try {
      await client.post("/auth/jwt/create");
    } catch (err) {
      // ignore
    }
    localStorage.removeItem("access_token");
    setUser(null);
    queryClient.clear();
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
