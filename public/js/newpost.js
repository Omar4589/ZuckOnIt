$(document).ready(function () {
  $("#new-post-form").on("submit", async function (event) {
    event.preventDefault();

    const title = $("#title").val().trim();
    const content = $("#content").val().trim();

    if (title && content) {
      try {
        const response = await fetch("/api/blog/", {
          method: "POST",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to create post.");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to create post.");
      }
    } else {
      alert("Please fill in both the title and content fields.");
    }
  });
});
