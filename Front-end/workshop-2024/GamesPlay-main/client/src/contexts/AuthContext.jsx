import { createContext, useContext } from "react";

export const AuthContext = createContext({
  email: "",
  accessToken: "",
  isAuthenticate: false,
  changeAuthState: () => null,
  logout: () => null,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};
