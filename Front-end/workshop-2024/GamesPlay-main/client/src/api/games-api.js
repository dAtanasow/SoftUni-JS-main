import * as request from '../api/requester'

const BASE_URL = 'http://localhost:3030/data/games';

export const getAll = async () => {
    const result = await request.get(BASE_URL)

    const games = Object.values(result);

    return games;
}

export const getOne = (gameId) => request.get(`${BASE_URL}/${gameId}`);

export const create = (gameData) => request.post(`${BASE_URL}`, gameData)

const gamesApi = {
    getAll,
    getOne,
    create
};

export default gamesApi;
