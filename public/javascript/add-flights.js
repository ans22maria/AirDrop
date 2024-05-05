$().ready(function () {
  $('#addFlights').on('submit', function (event) {
    // Prevent default form submission
    event.preventDefault();
    // Serialize form data
    let formDataArray = $('#addFlights').serializeArray();
    let formData = {};
    // Converting as JSON Array
    $.each(formDataArray, function (index, item) {
      formData[item.name] = item.value;
    });
    // Ajax query for saving the details.
    $.ajax({
      type: 'POST',
      url: '/add-flights',
      data: formData,
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  });
});
