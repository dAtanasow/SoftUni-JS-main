import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";
import { useEffect } from "react";

export default function Logout() {
  const logout = useLogout();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
    };
    performLogout();
  }, [logout]);
  return <Navigate to="/" />;
}
