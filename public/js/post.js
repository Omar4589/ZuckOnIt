$('#comment-form').on('submit', async function (event) {
  event.preventDefault();

  const content = $('#content').val().trim();
  const postId = window.location.pathname.split('/')[2];

  if (content) {
    try {
      const response = await fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to add comment');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add comment');
    }
  }
});
