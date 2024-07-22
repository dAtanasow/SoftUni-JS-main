import { get } from "./requester.js"

const baseUrl = "http://localhost:3030/"
const endPoints = {
    catalog: "data/movies",
    addLike: "data/likes "
}

export async function getAllMovies() {
    return await get(baseUrl + endPoints.catalog);
}

export async function getSingleMovie(id) {
    return await get(baseUrl + endPoints.catalog + "/" + id);
}

export async function getLike(id) {
    return await get(baseUrl + `data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
}

export async function createLike(id) {
    return await post(baseUrl + endPoints.addLike, {"moviesId": id})
}