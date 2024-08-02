import { updateNav } from "./app.js"
import { showLoginView } from "./login.js"
import { clearUserData } from "./userHelper.js"
import { logout } from "./userService.js"

export async function showLogout() {
    await logout();
    clearUserData();
    updateNav();
    showLoginView();
}