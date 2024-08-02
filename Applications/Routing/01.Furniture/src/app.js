import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { showDashboard } from "./views/dashboard.js";
import { showCreate } from "./views/create.js"
import { showEdit } from "./views/edit.js";
import { showMyFurniture } from "./views/myFurniture.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { util } from "./utils/userUtil.js";
import { showDetails } from "./views/details.js";
import { showLogout } from "./views/logout.js";
import { deleteItem } from "./views/delete.js";

const root = document.querySelector("div[data-id='root']");
const userNav = document.getElementById("user");
const guestNav = document.getElementById("guest");
page.start();
goTo("/")
updateNav();

page(updateCtx);
page("/", showDashboard);
page("/dashboard", showDashboard);
page("/details/:id", showDetails)
page("/create", showCreate);
page("/edit/:id", showEdit);
page("/delete/:id", deleteItem);
page("/myFurniture", showMyFurniture);
page("/logout", showLogout);
page("/login", showLogin);
page("/register", showRegister);

function updateCtx(ctx, next) {
    ctx.render = renderer;
    ctx.goTo = goTo;
    next();
}

function renderer(data) {
    render(data, root);
}

function goTo(path) {
    page.redirect(path);
}

export function updateNav() {
    const userData = util.getUser();

    if (userData) {
        userNav.style.display = 'inline-block';
        guestNav.style.display = 'none';

    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline-block';
    }
}