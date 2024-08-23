import { login } from "./userService.js";
import { setUserData } from "./userHelper.js";
import { updateNav } from "./app.js";
import { showHomeView } from "./home.js";

document.getElementById("form-login").addEventListener("submit", onLogin);

export function showLoginView() {
    document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
    document.getElementById("form-login").style.display = 'block'

}

async function onLogin(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");

    if (!email || !password) {
        return alert("Error Login");
    }
    const data = await login({ email, password });
    setUserData(data);
    updateNav(data.email);
    showHomeView();
}
