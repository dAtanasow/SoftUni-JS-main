import { register } from "./userService.js"
import { showHomeView } from "./home.js";
import { setUserData } from "./userHelper.js";
import { updateNav } from "./app.js";

document.getElementById("register-form").addEventListener("submit", onRegister);

export function showRegisterView() {
    document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
    document.getElementById("form-sign-up").style.display = 'block'
}

async function onRegister(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("repeatPassword");
    if (!email || !password || password.length < 6 || password !== rePass) {
        return alert("Error");
    }
    
    const data = await register({ email, password });
    setUserData(data);
    updateNav(data.email);
    showHomeView();
}
