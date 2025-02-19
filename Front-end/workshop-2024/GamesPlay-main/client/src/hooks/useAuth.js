import { login } from "../api/auth-api"

export const useLogin = () => {
    const loginHandler = async (email, password) => {

        login(email, password);

    }

    return loginHandler
}