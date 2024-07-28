import { login } from "../api/userService.js";
import { setUser } from "../utils/userUtil.js";

const section = document.querySelector("div[data-view-name='login']");
const form = section.querySelector("form");
form.addEventListener('submit', onSubmit);

let context;

export function showLoginView(ctx) {
    context = ctx;
    context.render(section)
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        alert("Error Login");
    }

    const userData = await login({ email, password });
    setUser(userData);
    context.updateNav();
    context.goTo("/");
    form.reset();

}