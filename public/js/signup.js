$('#signup-form').on('submit', async function(event) {
    event.preventDefault();
  
    const username = $('#username').val().trim();
    const password = $('#password').val().trim();
  
    if (username && password) {
      const response = await $.ajax({
        url: '/api/users/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username, password }),
      });
  
      if (response) {
        location.replace('/dashboard');
      } else {
        alert('Failed to sign up');
      }
    }
  });
  