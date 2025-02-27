import { useNavigate } from "react-router-dom";
import { login, logout, register } from "../api/auth-api"
import { useAuthContext } from "../contexts/AuthContext";


export const useLogin = () => {
    const { changeAuthState } = useAuthContext()
    const loginHandler = async (email, password) => {
        const authData = await login(email, password);
        delete authData.password;
        changeAuthState(authData);
        return authData;
    }

    return loginHandler
}

export const useRegister = () => {
    const { changeAuthState } = useAuthContext()

    const registerHandler = async (email, password) => {
        const authData = await register(email, password);
        delete authData.password;
        changeAuthState(authData);
        return authData;
    }

    return registerHandler
}

export const useLogout = () => {
    const navigate = useNavigate();

    const { logout: localLogout, accessToken } = useAuthContext()
    const logoutHandler = async () => {
        if (!accessToken) {
            console.log("No active session detected.");
            localLogout();
            navigate("/");
            return;
        }

        try {

            await logout();
            localLogout();
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);

        }
    }

    return logoutHandler;
}