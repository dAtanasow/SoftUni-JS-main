import { updateNav } from "../app.js";
import { util } from "../utils/userUtil.js";


export function showLogout(ctx) {
    const userData = util.getUser()
    util.removeUser(userData);
    ctx.goTo('/dashboard')
    updateNav();
}