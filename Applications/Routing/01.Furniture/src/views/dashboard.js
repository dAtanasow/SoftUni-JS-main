import { html } from "../../node_modules/lit-html/lit-html.js"
import { dataService } from "../api/dataService.js"

const dashboardTemp = (items) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${items.map(item => cardTemp(item))}
        </div>
`

const cardTemp = (data) => html`   
    <div class="col-md-4">
            <div class="card text-white bg-primary">
               <div class="card-body">
                      <img src='.././${data.img}'/>
                     <p>${data.description}</p>
                     <footer>
                         <p>Price: <span>${data.price}</span></p>
                     </footer>
                     <div>
                         <a href="/details/${data._id}" class="btn btn-info">Details</a>
                    </div>
                </div>
            </div>
    </div>
`

export async function showDashboard(ctx) {
    const data = await dataService.getAllFurniture();
    ctx.render(dashboardTemp(data));
}