$(".delete-post").on("click", async function () {
  const id = $(this).attr("data-id");

  try {
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  } catch (error) {
    console.error(error);
  }
});
