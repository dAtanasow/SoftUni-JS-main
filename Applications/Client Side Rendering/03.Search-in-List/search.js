import { towns } from "./towns.js"
import { html, render } from "./node_modules/lit-html/lit-html.js"

const townsRoot = document.getElementById("towns");
const inputRef = document.getElementById("searchText")
document.querySelector("button").addEventListener("click", search);

update();
function update(match) {
   render(renderer(towns, match), townsRoot);
};

function renderer(towns, match) {
   return html`
   <ul>
      ${towns.map(town => townTemp(town, match?.includes(town)))}
   </ul>
   `
}

function townTemp(town, isActive) {
   return html`
   <li class=${isActive ? "active" : ""}>${town}</li>
   `
}

function search() {
   const searchText = inputRef.value
   const match = towns.filter(town => town.includes(searchText));
   update(match);
}
