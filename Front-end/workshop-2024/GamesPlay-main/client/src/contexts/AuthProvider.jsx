import { AuthContext } from "./AuthContext";
import usePersistedState from "../hooks/usePersistedState";

export default function AuthProvider({ children }) {
  const [authState, setAuthState] = usePersistedState("auth", null);

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
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}
