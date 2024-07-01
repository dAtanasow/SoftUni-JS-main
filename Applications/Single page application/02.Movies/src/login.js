export function showLoginView() {
    document.querySelectorAll("section").forEach(x => { x.style.display = 'none'});
    document.getElementById("form-login").style.display = 'block'
}
