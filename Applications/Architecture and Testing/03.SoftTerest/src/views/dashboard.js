import { dataService } from "../api/dataService.js";

const section = document.querySelector("div[data-view-name='dashboard']");
let context;

export async function showDashboardView(ctx) {
    section.innerHTML = ''
    context = ctx;
    context.render(section);
    const data = await dataService.getAllIdeas()

    if (!data) {
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h>`
    }

    data.forEach(idea => {
        section.innerHTML += createIdeaTemp(idea);
    });

    section.querySelectorAll('a').forEach(a => a.addEventListener('click', onSubmitHandler));
}

function onSubmitHandler(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    debugger
    context.goTo('details', id)
}



function createIdeaTemp(data) {
    return `
        <div
          class="card overflow-hidden current-card details"
          style="width: 20rem; height: 18rem"
        >
          <div class="card-body">
            <p class="card-text">${data.title}</p>
          </div>
          <img
            class="card-image"
            src="${data.img}"
            alt="Card image cap"
          />
          <a class="btn" href="details dataset-id=${data._id}">Details</a>
        </div>
    `
}