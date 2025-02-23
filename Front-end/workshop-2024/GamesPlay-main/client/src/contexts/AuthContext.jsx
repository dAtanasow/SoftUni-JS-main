import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext({
  email: "",
  accessToken: "",
  isAuthenticate: false,
  changeAuthState: () => null,
  logout: () => null,
});

export function AuthContextProvider(props) {
  const [authState, setAuthState] = usePersistedState("auth", {});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState(null);
  };

  const contextData = {
    userId: authState?._id,
    email: authState?.email,
    accessToken: authState?.accessToken,
    isAuthenticate: !!authState?.email,
    changeAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}
