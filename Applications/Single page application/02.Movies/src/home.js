export function showHomeView() {
    document.querySelectorAll("section").forEach(x => { x.style.display = 'none'});
    document.getElementById("home-page").style.display = 'block'
}
