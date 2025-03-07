document.addEventListener("DOMContentLoaded", loadBlogPosts);

const PASSWORD = "Blogadmin123"; // Admin password

function loadBlogPosts() {
    fetch("blog.txt")
        .then(response => response.text())
        .then(data => {
            let blogContainer = document.getElementById("blog-posts");
            blogContainer.innerHTML = ""; // Clear previous content
            let posts = data.split("\n---\n"); // Split posts using "---" as a separator
            posts.forEach(post => {
                if (post.trim()) {
                    let [title, content] = post.split("\n", 2);
                    blogContainer.innerHTML += `<div class="blog-post">
                        <h3>${title}</h3>
                        <p>${content}</p>
                    </div>`;
                }
            });
        })
        .catch(error => console.error("Error loading blog posts:", error));
}

function addBlogPost() {
    let enteredPassword = document.getElementById("admin-password").value;
    if (enteredPassword !== PASSWORD) {
        alert("Incorrect password!");
        return;
    }

    let title = document.getElementById("blog-title").value.trim();
    let content = document.getElementById("blog-content").value.trim();

    if (title === "" || content === "") {
        alert("Please enter a title and content for the blog post.");
        return;
    }

    let newPost = `${title}\n${content}\n---\n`;

    // Simulating writing to a file (this won't work locally due to browser security)
    fetch("blog.txt", { method: "POST", body: newPost })
        .then(() => {
            alert("Blog post added successfully!");
            document.getElementById("blog-title").value = "";
            document.getElementById("blog-content").value = "";
            loadBlogPosts(); // Refresh posts
        })
        .catch(error => console.error("Error adding blog post:", error));
}
