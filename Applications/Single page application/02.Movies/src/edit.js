export function showEditView() {
    document.querySelectorAll("section").forEach(x => { x.style.display = 'none' });
    document.getElementById("edit-movie").style.display = 'block'
}
