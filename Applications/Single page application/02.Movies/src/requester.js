import { clearUserData, getUserToken } from "./userHelper.js";

async function request(method, url, data) {
    const option = {
        method,
        headers: {}
    };
    const userToken = getUserToken();
    
    if (data) {
        option.body = JSON.stringify(data);
        option.headers['Content-type'] = 'application/json';
    };

    if (userToken) {
        option.headers["X-Authorization"] = userToken;
    };

    try {
        const response = await fetch(url, option);
        if (!response.ok) {
            if (response.status === 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }
        
        if (response.status === 204) {
            return response;
        }
    
        return response.json();
    } catch (error) {
        return alert(error);
    }

}

const get = (url) => {
    return request("GET", url);
}
const post = (url, data) => {
    return request("POST", url, data);
}
const update = (url, data) => {
    return request("PUT", url, data);
}
const del = (url) => {
    return request("DELETE", url);
}

export {
    get, post, update, del
}