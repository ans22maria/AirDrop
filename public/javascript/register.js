$().ready(function () {
  // Listener to capture the submission of the user registration form
  $('#register').on('submit', function (event) {
    event.preventDefault();
    let formDataArray = $('#register').serializeArray();
    let formData = {};
    $.each(formDataArray, function (index, item) {
      formData[item.name] = item.value;
    });
    // Ajax request to save the user registration data to the database.
    $.ajax({
      type: 'POST',
      url: '/register',
      data: formData,
      success: function (response) {
        window.location.href = '/login';
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  });
});
