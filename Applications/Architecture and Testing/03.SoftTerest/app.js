import { logout } from "./src/api/userService.js";
import { hasUser, removeUser } from "./src/utils/userUtil.js";
import { showDashboardView } from "./src/views/dashboard.js";
import { showHomeView } from "./src/views/home.js";
import { showLoginView } from "./src/views/login.js";
import { showRegisterView } from "./src/views/register.js";
import { showCreateView } from "./src/views/create.js";
import { showDetailsView } from "./src/views/details.js";

document.querySelectorAll("div[data-selection='section']").forEach(el => el.remove());

const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);
updateNav();

const routes = {
    "/": showHomeView,
    "home": showHomeView,
    "login": showLoginView,
    "register": showRegisterView,
    "logout": async () => {
        await logout();
        removeUser();
        updateNav();
        goTo("/");
    },
    "dashboard": showDashboardView,
    "details": showDetailsView,
    "create": showCreateView,
    "*": () => console.error("404 Not Found")
}



function updateNav() {
    const isUser = hasUser();
    const guestA = document.querySelectorAll("a[data-show='guest']");
    const userA = document.querySelectorAll("a[data-show='user']");

    if (isUser) {
        guestA.forEach(a => a.style.display = "none");
        userA.forEach(a => a.style.display = "block");
    } else {
        guestA.forEach(a => a.style.display = "block");
        userA.forEach(a => a.style.display = "none");
    }

}

function onNavigate(e) {
    e.preventDefault();
    let element = e.target
    if (e.target.tagName !== "A" && e.target.tagName !== "IMG") {
        return;
    }
    if (e.target.tagName == "IMG") {
        element = e.target.parentElement
    }

    const viewName = (new URL(element.href).pathname).split("/Applications/Architecture%20and%20Testing/03.SoftTerest/").join("");
    goTo(viewName);
}

let ctx = {
    render: renderer,
    goTo,
    updateNav
}
function renderer(view) {
    main.replaceChildren(view)
}
function goTo(name, ...params) {
    const handler = routes[name];
    if (typeof (handler) !== 'function') {
        return routes["*"]();
    }
    handler(ctx, params);
}

goTo('home')