import { api } from "./requester.js";

const baseUrl = "http://localhost:3030/";
const endPoints = {
    myFurniture: (userId) => `data/catalog?where=_ownerId%3D%22${userId}%22`,
    furniture: "data/catalog/"
}

async function getAllFurniture() {
    return await api.get(baseUrl + endPoints.furniture);
}
async function getFurniture(id) {
    return await api.get(baseUrl + endPoints.furniture + `/${id}`)
}
async function createFurniture(data) {
    return await api.post(baseUrl + endPoints.furniture, data)
}
async function getMyFurniture(id) {
    return await api.get(baseUrl + endPoints.myFurniture(id))
}
async function updateFurniture(id, data) {
    return await api.put(baseUrl + endPoints.furniture + `/${id}`, data)
}
async function delFurniture(id) {
    return await api.del(baseUrl + endPoints.furniture + `/${id}`)
}

export const dataService = {
    getAllFurniture,
    getFurniture,
    createFurniture,
    getMyFurniture,
    updateFurniture,
    delFurniture
}