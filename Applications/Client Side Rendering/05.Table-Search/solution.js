import { html, render } from "./node_modules/lit-html/lit-html.js"

const url = "http://localhost:3030/jsonstore/advanced/table";

const root = document.querySelector("tbody");
const table = document.querySelector("table");
const inputRef = document.getElementById("searchField")

document.querySelector('#searchBtn').addEventListener('click', onClick);


let match = false;
update(url);

async function update(url, match) {
   const response = await fetch(url);
   const data = await response.json();
   const students = Object.values(data);
   render(renderer(students, match), root);

}

function createTrTemp(data, hasMatch) {
   return html`
   <tr class=${hasMatch ? "select" : ""}>
      <td>${data.firstName} ${data.lastName}</td>
      <td>${data.email}</td>
      <td>${data.course}</td>
   </tr>
   `
}

function renderer(data, match) {
   return html`${data.map(info => createTrTemp(info, match?.includes(info)))}`
}

function onClick(e) {
   e.preventDefault();
   const searchText = inputRef.value;
   match = hasMatch(searchText);
   update(url, match);
}

function hasMatch(searchText) {
   const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
   for (let row of rows) {
      const cells = row.getElementsByTagName('td');
      match = false;
      for (let cell of cells) {
         if (cell.textContent.toLowerCase().includes(searchText)) {
            match = true;
            break;
         }
      }
   }
}
