import { useSelector } from "react-redux";

export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(token);
  console.log(
    "useAuth - user:",
    user,
    "token:",
    token,
    "isAuthenticated:",
    isAuthenticated
  );
  return { user, token, isAuthenticated };
};
