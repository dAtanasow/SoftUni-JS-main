import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useGetOneGame } from "../../hooks/useGames";
import gamesApi from "../../api/games-api";

export default function GameEdit() {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game] = useGetOneGame(gameId);

  const { changeHandler, submitHandler, values } = useForm(
    game,
    async (values) => {
      await gamesApi.update(gameId, values);
      navigate(`/games/${gameId}/details`);
    },
    { reinitializeForm: true }
  );

  return (
    <section id="edit-page" className="auth">
      <form id="edit" onSubmit={submitHandler}>
        <div className="container">
          <h1>Edit Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            onChange={changeHandler}
            type="text"
            id="title"
            name="title"
            value={values.title}
          />

          <label htmlFor="category">Category:</label>
          <input
            onChange={changeHandler}
            type="text"
            id="category"
            name="category"
            value={values.category}
          />

          <label htmlFor="levels">MaxLevel:</label>
          <input
            onChange={changeHandler}
            type="number"
            id="maxLevel"
            name="maxLevel"
            min="1"
            value={values.maxLevel}
          />

          <label htmlFor="game-img">Image:</label>
          <input
            onChange={changeHandler}
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={values.imageUrl}
          />

          <label htmlFor="summary">Summary:</label>
          <textarea
            onChange={changeHandler}
            name="summary"
            id="summary"
            value={values.summary}
          ></textarea>
          <input className="btn submit" type="submit" value="Edit" />
        </div>
      </form>
    </section>
  );
}
