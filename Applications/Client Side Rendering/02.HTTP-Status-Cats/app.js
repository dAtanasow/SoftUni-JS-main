import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const root = document.getElementById("allCats");

render(html`<ul>${cats.map(cat => template(cat))}</ul>`, root);

function template(cat) {
    return html`
        <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button @click=${onClick} class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id=${cat.id}>
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
        </li>
    `
}

function onClick(e) {
    const details = e.target.parentElement.querySelector("div");
    const isHidden = details.style.display == "none";

    if (isHidden) {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}