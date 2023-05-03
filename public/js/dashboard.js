$('.delete-post').on('click', async function() {
    const id = $(this).attr('data-id');
  
    const response = await $.ajax({
      url: `/api/blog/${id}`,
      method: 'DELETE',
    });
  
    if (response) {
      location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  });
  