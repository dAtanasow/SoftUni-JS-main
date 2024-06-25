function attachEvents() {

    const url = "http://localhost:3030/jsonstore/messenger"

    document.getElementById("refresh").addEventListener("click", getMsg);
    document.getElementById("submit").addEventListener("click", sendMsg);

    async function getMsg() {
        const textArea = document.getElementById("messages");
        textArea.value = '';
        const response = await fetch(url);
        const allMsg = await response.json();

        Object.values(allMsg).forEach(x => {
            textArea.value += `${x.author}: ${x.content}\n`
        })
        textArea.value = textArea.value.trim();
    }

    async function sendMsg(e) {
        const nameRef = document.querySelector("input[name='author']");
        const msgRef = document.querySelector("input[name='content']");
        const name = nameRef.value;
        const msg = msgRef.value;
        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author: name, content: msg })
        }

        if (!name || !msg) {
            return;
        }

        await fetch(url, data)
        getMsg();
        nameRef.value = '';
        msgRef.value = '';
    }
}

attachEvents();