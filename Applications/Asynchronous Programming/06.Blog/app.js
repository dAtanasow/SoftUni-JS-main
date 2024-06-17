function attachEvents() {
    
    const commentsURL = 'http://localhost:3030/jsonstore/blog/comments'
    const postsURL = 'http://localhost:3030/jsonstore/blog/posts'

    const container = document.getElementById("posts")
    
    document.getElementById("btnViewPost").addEventListener('click', getViews);
    document.getElementById("btnLoadPosts").addEventListener('click', getPosts);

    

    async function getPosts() {
        const response = await fetch(postsURL);
        const data = await response.json();
        const allPosts = Object.values(data)
        container.innerHTML = ""
        allPosts.forEach(x => {
            container.innerHTML += `<option value="${x.id}">${x.title}</option>`
        })

        
    }
    

    function getViews() {

        
    }
}

attachEvents();