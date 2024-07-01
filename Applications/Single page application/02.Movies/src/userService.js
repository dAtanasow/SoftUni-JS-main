import { get, post, update, del } from './requester.js';
const endpoints = {
    login: "http://localhost:3030/users/login",
    register: "http://localhost:3030/users/register",
    logout: "http://localhost:3030/users/logout"
}

async function register(data) {
    return await post(endpoints.register, data);
}



export { register }