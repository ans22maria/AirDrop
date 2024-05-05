$().ready(function () {
  // Handler to be invoked on submission of the Login Form.
  $('#login').on('submit', function (event) {
    event.preventDefault();
    let formDataArray = $('#login').serializeArray();
    let formData = {};
    $.each(formDataArray, function (index, item) {
      formData[item.name] = item.value;
    });
    // Ajax request for the login form submission.
    var request = $.ajax({
      type: 'POST',
      url: '/login',
      data: formData
    });
    request.then(
      function (response) {
        console.log('Success:', response);
        if (response == 'Invalid') {
          alert('Incorrect Username or password');
        }
      },
      function (error) {
        console.error('Error:', error);
      }
    );
  });
});
