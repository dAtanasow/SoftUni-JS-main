function library() {
    document.getElementById("loadBooks").addEventListener("click", loadAllBooks);
    const formRef = document.querySelector("form");
    formRef.addEventListener("submit", onSubmit);
    const tbody = document.querySelector("tbody")
    const bodyRef = document.querySelector("body")
    let titleRef = document.querySelector("input[name='title']")
    let authorRef = document.querySelector("input[name='author']")

    const url = "http://localhost:3030/jsonstore/collections/books";

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let bookInfo = Object.fromEntries(formData)
        let title = bookInfo.title;
        let author = bookInfo.author;

        if (!title || !author) {
            return;
        }
        await fetch(url, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ author: author, title: title })
        })
        loadAllBooks();
    }

    async function loadAllBooks() {

        const response = await fetch(url);
        const data = await response.json();
        tbody.innerHTML = ""

        Object.entries(data).forEach(([id, rec]) => {
            let book = createTr(rec, id);
            tbody.appendChild(book);
        })
    }

    function createTr(data, id) {
        let tr = document.createElement("tr");
        let title = document.createElement("td");
        let author = document.createElement("td");
        let editBtn = document.createElement("button");
        let delBtn = document.createElement("button");

        title.textContent = data.title;
        author.textContent = data.author;
        editBtn.textContent = "Edit";
        delBtn.textContent = "Delete"
        editBtn.dataset.id = id;
        delBtn.dataset.id = id;

        editBtn.addEventListener("click", onEdit);
        delBtn.addEventListener("click", onDelete);

        tr.appendChild(title);
        tr.appendChild(author);
        tr.appendChild(editBtn);
        tr.appendChild(delBtn);

        titleRef.value = '';
        authorRef.value = '';
        return tr;
    }

    async function onEdit(e) {
        e.preventDefault()
        let id = e.target.dataset.id;
        document.querySelectorAll("#form").forEach(x => { x.remove() })
        formRef.style.display = "none"
        const form = document.createElement('form');
        form.setAttribute('id', 'form');

        let info = e.target.parentElement.children;
        let currentTitle = info[0].textContent;
        let currentAuthor = info[1].textContent;

        form.innerHTML = `
        <h3>Edit FORM</h3>
        <label>TITLE</label>
        <input type="text" name="title" value=${currentTitle}>
        <label>AUTHOR</label>
        <input type="text" name="author" value=${currentAuthor}>
        `
        let sendBtn = document.createElement("button");
        sendBtn.textContent = "Save";
        form.appendChild(sendBtn);
        bodyRef.appendChild(form);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            let data = {
                title: formData.get('title'),
                author: formData.get('author')
            };

            await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })

            loadAllBooks();
            formRef.style.display = 'block';
            bodyRef.removeChild(form);
        });


    }
    async function onDelete(e) {
        let id = e.target.dataset.id;
        await fetch(`${url}/${id}`, { method: "DELETE" });
        loadAllBooks();
    }
}
library();