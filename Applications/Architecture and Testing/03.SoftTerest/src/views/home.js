
const section = document.querySelector("div[data-view-name='home']");


export function showHomeView(ctx) {
    ctx.render(section);
}
