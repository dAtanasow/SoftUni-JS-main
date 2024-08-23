import { createMovie } from "./dataService.js";
import { showHomeView } from "./home.js";

export function showAddMovieView(e) {
    e.preventDefault();
    document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
    document.getElementById("add-movie").style.display = 'block'
}
document.querySelector("form").addEventListener("submit", addMovie);

async function addMovie(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let title = formData.get("title");
    let description = formData.get("description");
    let img = formData.get("img");

    await createMovie({ title, description, img });
    showHomeView();
}