const url = "http://localhost:3030/jsonstore/advanced/dropdown";
import { html, render } from "./node_modules/lit-html/lit-html.js"

const inputRef = document.getElementById("itemText");
const root = document.getElementById("menu");
document.querySelector("form").addEventListener("submit", addItem);

getListItems();
async function getListItems() {
    const response = await fetch(url);
    const data = await response.json();
    const items = Object.values(data).map(item => createItem(item))
    update(items);
}

function update(data) {
    render(data, root);
}

function createItem(item) {
    return html`
    <option values=${item._id}>
        ${item.text}
    </option>
    `
}
function addItem(e) {
    e.preventDefault();
    const item = inputRef.value;
    addItemReq({item});
    inputRef.value = "";
}

async function addItemReq(data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    getListItems();
}