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
    const { logout: localLogout } = useAuthContext()
    const logoutHandler = async () => {
        localLogout();
        await logout();
    }

    return logoutHandler;
}