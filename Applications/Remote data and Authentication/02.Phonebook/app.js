function attachEvents() {
    document.getElementById("btnLoad").addEventListener("click", onLoad);
    document.getElementById("btnCreate").addEventListener("click", onCreate);
    const container = document.getElementById("phonebook");

    const url = "http://localhost:3030/jsonstore/phonebook";

    async function onLoad(e) {
        const response = await fetch(url);
        const data = await response.json();
        container.innerHTML = "";
        const usersInfo = Object.values(data)
        Object.values(usersInfo).forEach(rec => {
            createAndAppendLi(rec);
        })
    }

    async function onCreate(e) {
        const personRef = document.getElementById("person");
        const phoneRef = document.getElementById("phone");
        const person = personRef.value;
        const phone = phoneRef.value;
        const data = {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ person: person, phone: phone })
        }
        await fetch(url, data)
        onLoad();
        personRef.value = ""
        phoneRef.value = ""
    }
    function createAndAppendLi(data) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.dataset.id = data._id
        btn.addEventListener("click", onDelete);
        li.textContent = `${data.person}: ${data.phone}`;
        li.appendChild(btn)
        container.appendChild(li)
    }

    async function onDelete(e) {
        const id = e.target.dataset.id;
        await fetch(url + '/' + id, { method: "DELETE" })
        onLoad();
    }
}

attachEvents();