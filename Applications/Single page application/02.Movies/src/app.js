import { showHomeView } from "./home.js";
import { showRegisterView } from "./register.js";
import { showLoginView } from "./login.js";
import { getUserData } from "./userHelper.js";
import { showLogout } from "./logout.js";

document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
document.querySelector('nav').addEventListener('click', onNavigate);

const userMsg = document.getElementById("welcome-msg");
const userNav = document.querySelectorAll("li.user");
const guestNav = document.querySelectorAll("li.guest");

const routes = {
    "/": showHomeView,
    "/register": showRegisterView,
    "/login": showLoginView,
    "/home": showHomeView,
    "/logout": showLogout
}

export function onNavigate(e) {
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
        userMsg.textContent = `Welcome, ${userData.email}`
    } else {
        userNav.forEach(li => { li.style.display = 'none' })
        guestNav.forEach(li => { li.style.display = 'block' })
        userMsg.textContent = '';
    }
}

updateNav();
showHomeView();