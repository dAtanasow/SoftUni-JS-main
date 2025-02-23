import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const AuthContext = createContext({
  email: "",
  accessToken: "",
  isAuthenticate: false,
  changeAuthState: () => null,
});

export function AuthContextProvider(props) {
  const [authState, setAuthState] = usePersistedState("auth", {});

  const changeAuthState = (state) => {
    localStorage.setItem("accessToken", state.accessToken);
    setAuthState(state);
  };
  const contextData = {
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticate: !!authState.email,
    changeAuthState,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}
