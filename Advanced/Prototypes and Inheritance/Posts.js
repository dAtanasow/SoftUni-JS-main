// You need to create several classes for Posts.
// Implement the following classes:
// ⦁	Post, which is initialized with the title (String) and content (String)
// ⦁	The 2 arguments should be public members
// ⦁	The Post class should also have toString() function which returns the following result:
// "Post: {postTitle}"
// "Content: {postContent}"
// ⦁	SocialMediaPost, which inherits the Post class and should be initialized with 2 additional arguments - likes (Number) and dislikes (Number). The class should hold:
// ⦁	comments(Strings) -  an array of strings
// ⦁	addComment(comment)- a function, which adds comments to that array
// ⦁	The class should extend the toString() function of the Post class, and should return the following result:
// "Post: {postTitle}"
// "Content: {postContent}"
// "Rating: {postLikes - postDislikes}"
// "Comments:"
// " * {comment1}"
// " * {comment2}"
// . . .
// In case there are no comments, return information only about the title, content, and rating of the post.
// ⦁	BlogPost, which inherits the Post class:
// ⦁	The BlogPost class should be initialized with 1 additional argument - views(Number).
// ⦁	The BlogPost class should hold 
// - view() - which increments the views of the object with 1, every time it is called. The function should return the object so that chaining is supported.
// ⦁	The BlogPost class should extend the toString() function of the Post class, and should return the following result:
// "Post: {postTitle}"
// "Content: {postContent}"
// "Views: {postViews}"


function solution() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }
        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content)
            this.likes = Number(likes);
            this.dislikes = Number(dislikes);
            this.comments = [];
        }
        addComment(comment) {
            this.comments.push(comment)
        }
        toString() {
            let buff = super.toString() + `\nRating: ${this.likes - this.dislikes}`
            if (this.comments.length > 0) {
                buff += "\nComments:\n" + this.comments.map(c => ` * ${c}`).join("\n");
            }
                return buff;
            }
        }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = Number(views);
        }
        view() {
            this.views++
            return this;
        }
        toString() {
            return super.toString() + `\nViews: ${this.views}`
        }
    }
    return { Post, SocialMediaPost, BlogPost };
}

const classes = solution();
let post = new classes.Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new classes.SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");
console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
