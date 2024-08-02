import { api } from "./requester.js"

const endPoints = {
    register: "http://localhost:3030/users/register",
    login: "http://localhost:3030/users/login",
    logout: "http://localhost:3030/users/logout"
}

async function register(data) {
    return await api.post(endPoints.register, data);
}

async function login(data) {
    return await api.post(endPoints.login, data);
}

async function logout() {
    return await api.get(endPoints.logout);
}

export { register, login, logout }