import { useEffect, useState } from "react";
import gamesApi from "../api/games-api";

export function useGetAllGames() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await gamesApi.getAll();

            setGames(result);
        })();
    }, []);

    return [games, setGames];
}

export function useGetOneGame(gameId) {
    const [game, setGame] = useState({});

    useEffect(() => {
        (async () => {
            const result = await gamesApi.getOne(gameId);
            setGame(result);
        })();
    }, [gameId]);

    return [game, setGame];
}

export function useCreateGame() {
    const gameCreateHandler = (gameData) => gamesApi.create(gameData)

    return gameCreateHandler
}


