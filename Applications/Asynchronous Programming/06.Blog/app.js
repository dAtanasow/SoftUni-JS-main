function attachEvents() {

    const commentsURL = 'http://localhost:3030/jsonstore/blog/comments'
    const postsURL = 'http://localhost:3030/jsonstore/blog/posts'

    const container = document.getElementById("posts")
    const postTitleRef = document.getElementById("post-title");
    const commentsRef = document.getElementById("post-comments");
    const postBodyRef = document.getElementById("post-body");
    let allPosts;
    
    document.getElementById("btnViewPost").addEventListener('click', getViews);
    document.getElementById("btnLoadPosts").addEventListener('click', getPosts);

    async function getPosts() {
        const response = await fetch(postsURL);
        const data = await response.json();
        allPosts = Object.values(data)
        container.innerHTML = ""
        allPosts.forEach(post => {
            const option = document.createElement("option");
            option.value = post.id;
            option.textContent = post.title;
            container.appendChild(option);
        })
    }

    async function getViews() {
        const currentPostId = container.value
        const currentPost = allPosts.find(post => post.id == currentPostId)

        if (currentPost) {
            postTitleRef.textContent = currentPost.title;
            postBodyRef.textContent = currentPost.body;
        }
        try {
            const response = await fetch(commentsURL);
            if (!response.ok) {
                throw new Error(`Failed to fetch comments: ${response.statusText}`)
            }
            const data = await response.json();
            const comments = Object.values(data).filter(comment => comment.postId == currentPostId);

            commentsRef.innerHTML = '';

            comments.forEach(comment => {
                const li = document.createElement("li");
                li.textContent = comment.text;
                commentsRef.appendChild(li);
            });
        } catch (error) {
            throw new Error(err.message)
        }
    }
}

attachEvents();