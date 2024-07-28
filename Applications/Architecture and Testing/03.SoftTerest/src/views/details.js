import { dataService } from "../api/dataService.js";
import { hasOwner } from "../utils/userUtil.js";

const section = document.querySelector("div[data-view-name='details']");
let context;
export async function showDetailsView(ctx, data) {
    debugger
    context = ctx;
    section.innerHTML = '';
    context.render(section);
    const id = data[0];


    const idea = await dataService.getIdea(id);
    const isOwner = hasOwner(idea._ownerId);
    section.innerHTML = createIdeaTemp(idea, isOwner);
    section.querySelector("a").addEventListener("click", onDelete);
}

async function onDelete(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    await dataService.removeIdea(id);
    context.goTo("dashboard");
}

function createIdeaTemp(data, isOwner) {
    return `
     <img class="det-img" src=${data.img} />
        <div class="desc">
          <h2 class="display-5">${data.title}</h2>
          <p class="infoType">Description:</p>
          <p class="idea-description">
           ${data.description}
          </p>
        </div>
        <div class="text-center">
          ${isOwner ? `<a class="btn detb" data-id=${data._id} href="">Delete</a>` : ""}
    `
}