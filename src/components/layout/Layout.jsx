import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import { useLazyGetMeQuery } from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAuth } from "../../features/auth/useAuth";

export default function Layout() {
  const dispatch = useDispatch();
  const [fetchUser] = useLazyGetMeQuery();
  const { token } = useAuth(); // read token from Redux

  useEffect(() => {
    if (!token) return; // don't fetch /me without a token

    const loadUser = async () => {
      try {
        const userData = await fetchUser().unwrap();
        dispatch(setCredentials({ user: userData, token }));
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    loadUser();
  }, [token, fetchUser, dispatch]);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
