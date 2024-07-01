import { showHomeView } from "./home.js";
import { showRegisterView } from "./register.js";
import { showLoginView } from "./login.js";
import { getUserData } from "./userHelper.js";

document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
const userNav = document.querySelectorAll("li.user");
const guestNav = document.querySelectorAll("li.guest");
document.querySelector('nav').addEventListener('click', onNavigate);

const routes = {
    "/register": showRegisterView,
    "/login": showLoginView,
    "/home": showHomeView
}

function onNavigate(e) {
    if (e.target.tagName !== "A" || !e.target.href) {
        return;
    }
    e.preventDefault();
    const url = new URL(e.target.href);
    const path = url.pathname;
    routes[path]();
}

export function updateNav() {
    const userData = getUserData();
    if (userData) {
        userNav.forEach(li => { li.style.display = 'block' })
        guestNav.forEach(li => { li.style.display = 'none' })
    } else {
        userNav.forEach(li => { li.style.display = 'none' })
        guestNav.forEach(li => { li.style.display = 'block' })
    }
}