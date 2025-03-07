<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = trim($_POST["title"]);
    $content = trim($_POST["content"]);

    if ($title === "" || $content === "") {
        echo "Error: Title and content cannot be empty.";
        exit;
    }

    $newPost = "$title\n$content\n---\n";

    // Save post to blog.txt
    file_put_contents("blog.txt", $newPost, FILE_APPEND);
    echo "Blog post saved successfully!";
}
?>
