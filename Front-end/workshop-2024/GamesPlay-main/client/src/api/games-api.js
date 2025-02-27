import * as request from '../api/requester'

const BASE_URL = 'http://localhost:3030/data/games';

export const getAll = async () => {
    const result = await request.get(BASE_URL)

    const games = Object.values(result);

    return games;
}

export const getOne = (gameId) => request.get(`${BASE_URL}/${gameId}`);

export const create = (gameData) => request.post(`${BASE_URL}`, gameData);

export const remove = (gameId) => request.del(`${BASE_URL}/${gameId}`);

export const update = (gameId, gameData) => request.put(`${BASE_URL}/${gameId}`, gameData);

export const getLatest = async () => {
    const urlSearchParams = new URLSearchParams({
        sortBy: `_createdOn desc`,
        pageSize: 3
    })
    try {
        const result = await request.get(`${BASE_URL}?${urlSearchParams.toString()}`);

        const latestGames = Object.values(result);

        return latestGames;
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
};

const gamesApi = {
    getAll,
    getOne,
    create,
    remove,
    update,
    getLatest
};

export default gamesApi;
