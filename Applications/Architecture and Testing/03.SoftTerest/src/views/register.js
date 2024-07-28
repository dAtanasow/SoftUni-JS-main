import { register } from "../api/userService.js";
import { setUser } from "../utils/userUtil.js";

const section = document.querySelector("div[data-view-name='register']");
const form = section.querySelector("form");
form.addEventListener('submit', onSubmit);

let context;
export function showRegisterView(ctx) {
    context = ctx;
    context.render(section)
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const {email, password, repeatPassword} = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 6 || password !== repeatPassword) {
        return alert("Error Register");
    }

    const userData = await register({email, password});
    setUser(userData);
    context.goTo('/');
    context.updateNav();
    form.reset();
}