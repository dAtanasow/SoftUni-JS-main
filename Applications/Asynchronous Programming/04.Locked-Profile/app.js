async function lockedProfile() {

    const mainRef = document.querySelector("#main")
    mainRef.innerHTML = ""

    const profilesUrl = "http://localhost:3030/jsonstore/advanced/profiles"

    const response = await fetch(profilesUrl);
    const allProfilesInfo = await response.json();
    Object.values(allProfilesInfo).forEach(data => {

        const profileInfo = document.createElement("div");
        profileInfo.classList.add("profile");

        profileInfo.innerHTML =
            `<img src="./iconProfile2.png" class="userIcon" />
            Lock</label >
            <input type="radio" name="user${data._id}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${data._id}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${data._id}" value="${data.username}" disabled readonly />
            <div class="hidden-info">
            <hr>
            <label>Email:</label>
            <input type="email" name="user${data._id}Email" " value="${data.email}" disabled readonly />
            <label>Age:</label>
            <input type="text" name="user${data._id}Age" value="${data.age}" disabled readonly />
            </div>

            <button>Show more</button>`



        const hiddenInfo = profileInfo.querySelector('.hidden-info');
        hiddenInfo.style.display = "none"
        mainRef.appendChild(profileInfo)

        const button = profileInfo.querySelector('button')
        button.addEventListener('click', () => {
            const isLocked = profileInfo.querySelector("input[type='radio']:checked").value === "lock";
            if (!isLocked) {
                if (hiddenInfo.style.display === 'none' || hiddenInfo.style.display === "") {
                    hiddenInfo.style.display = 'block';
                    button.textContent = "Hide it";
                } else {
                    hiddenInfo.style.display = 'none';
                    button.textContent = "Show more";
                }
            }
        })
    });
}