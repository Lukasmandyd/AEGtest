const PASSWORD = "Blogadmin123"; // Admin password

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the Admin button
    let adminBtn = document.getElementById("admin-btn");
    if (adminBtn) {
        adminBtn.addEventListener("click", accessAdmin);
    }

    // Load blog posts when the page loads
    loadBlogPosts();
});

// Redirect to admin page if password is correct
function accessAdmin() {
    let enteredPassword = prompt("Enter Admin Password:");
    if (enteredPassword === PASSWORD) {
        window.location.href = "admin.html"; // Redirects to the admin panel
    } else {
        alert("Incorrect password!");
    }
}

// Logout function (returns to homepage)
function logout() {
    window.location.href = "index.html";
}

// Load blog posts
function loadBlogPosts() {
    fetch("http://AegPhp.free.nf/blog.txt") // Fetch blog posts from the InfinityFree server
        .then(response => response.text())
        .then(data => {
            let blogContainer = document.getElementById("blog-posts");
            if (blogContainer) {
                blogContainer.innerHTML = "";
                let posts = data.split("\n---\n");
                posts.forEach(post => {
                    if (post.trim()) {
                        let [title, content] = post.split("\n", 2);
                        blogContainer.innerHTML += `<div class="blog-post">
                            <h3>${title}</h3>
                            <p>${content}</p>
                        </div>`;
                    }
                });
            }
        })
        .catch(error => console.error("Error loading blog posts:", error));
}

// Save new blog post using PHP backend
function addBlogPost() {
    let title = document.getElementById("blog-title").value.trim();
    let content = document.getElementById("blog-content").value.trim();

    if (title === "" || content === "") {
        alert("Please enter a title and content for the blog post.");
        return;
    }

    fetch("http://AegPhp.free.nf/save_post.php", {  // Updated URL to InfinityFree server
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById("blog-title").value = ""; // Clear input fields
        document.getElementById("blog-content").value = "";
        loadBlogPosts(); // Reload blog posts
    })
    .catch(error => console.error("Error saving blog post:", error));
}
