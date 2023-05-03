$(document).ready(function () {
    $("#edit-post-form").on("submit", async function (event) {
      event.preventDefault();
  
      const title = $("#title").val().trim();
      const content = $("#content").val().trim();
      const postId = $("#post-id").val();
  
      if (title && content) {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to update post");
        }
      }
    });
  });
  