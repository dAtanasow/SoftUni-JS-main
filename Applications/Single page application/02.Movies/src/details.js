import { deleteMovie, getLike, getSingleMovie } from "./dataService.js";
import { showEditView } from "./edit.js";
import { showHomeView } from "./home.js";
import { getUserId } from "./userHelper.js";

const section = document.getElementById("movie-example")

export async function showDetails(e) {
  e.preventDefault();
  document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
  section.style.display = 'block';

  const id = e.target.dataset.id;
  const data = await getSingleMovie(id);
  const dataLikes = await getLike(id);
  section.innerHTML = "";
  listDetails(data, dataLikes);
}

function listDetails(data, dataLikes) {
  const container = document.createElement("div");
  container.classList.add('container');
  const isOwner = getUserId() === data._ownerId;
  let temp = ` 
        <div class="row bg-light text-dark">
            <h1>Movie title: ${data.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${data.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${data.description}
              </p>
            </div>
        </div>`

  if (isOwner) {
    temp += `
          <a class="btn btn-danger" data-id="delete" href="delete">Delete</a>
          <a class="btn btn-warning" data-id="edit" href="edit">Edit</a>
          <span class="enrolled-span">Liked ${dataLikes}</span>
          `
  } else {
    temp += `
          <a class="btn btn-primary" href="like">Like</a>
          <span class="enrolled-span">Liked 1</span>
          `
  }
  container.innerHTML = temp;
  container.addEventListener("click", onAction)
  section.appendChild(container);
  if (isOwner) {
    document.querySelector("[data-id='delete']").addEventListener("click", onDelete);
    document.querySelector("[data-id='edit']").addEventListener("click", showEditView);

  }
}

function onAction(e) {
  e.preventDefault()
}

async function onDelete(e) {

}