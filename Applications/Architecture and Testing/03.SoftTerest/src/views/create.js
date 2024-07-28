import { dataService } from "../api/dataService.js";

const section = document.querySelector("div[data-view-name='create']");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

let context;
export function showCreateView(ctx) {
    context = ctx;
    context.render(section);
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { title, description, imageURL } = Object.fromEntries(formData)
    debugger

    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        return alert("Error create");
    }
debugger
    await dataService.createIdea({title,description,imageURL});
    context.goTo("dashboard");
    form.reset();
}