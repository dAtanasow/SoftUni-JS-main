import { html, render } from "./node_modules/lit-html/lit-html.js"
document.querySelector("form").addEventListener("submit", onSubmit);

const root = document.getElementById("root");
const inputRef = document.getElementById("towns");

function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const towns = formData.get("towns").split(", ");
    render(createTownTemp(towns), root);
    inputRef.value = "";
}

function createTownTemp(towns) {
    return html`
        <ul>
            ${towns.map(town => html`<li>${town}</li>`)}
        </ul>
        `
}