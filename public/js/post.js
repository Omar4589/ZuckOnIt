$('#comment-form').on('submit', async function(event) {
    event.preventDefault();
  
    const content = $('#content').val().trim();
    const postId = window.location.pathname.split('/')[2];
  
    if (content) {
      const response = await $.ajax({
        url: `/api/blog/${postId}/comments`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ content }),
      });
  
      if (response) {
        location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  });
  