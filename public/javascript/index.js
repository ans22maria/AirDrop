$().ready(function () {
    $('#boardingPointSelector').select2({
      placeholder: 'Select your Boarding Point',
      allowClear: true
    });
  
    // Hiding the Destination div.
    $('#destination-div').hide();
    // Hiding the Seat div.
    $('#seat-div').hide();
    // Hiding the submit button.
    $('#submit-button').hide();
    // Hiding the submit button.
    $('#summary').hide();
  
    // Ajax call for populating the boarding points dynamically.
    $.ajax({
      url: '/list-boarding-points',
      method: 'GET',
      success: function (response) {
        let $select = $('#boardingPointSelector');
        $select.empty();
        // Add default option
        $select.append(
          "<option value='' disabled='true'>Select Your Boarding Point</option>"
        );
        // Add options from the array
        $.each(response, function (index, optionText) {
          $select.append(
            "<option value='" +
              optionText.boardingPoint +
              "'>" +
              optionText.boardingPoint +
              '</option>'
          );
        });
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });
  
    // Ajax Call for populating the destination points on the basis of the boarding point.
    $('#boardingPointSelector').on('change', function () {
      // Hiding the Seat div.
      $('#seat-div').hide();
      // Hiding the submit button.
      $('#submit-button').hide();
      // Hiding the submit button.
      $('#summary').hide();
      const boardingPoint = $(this).val();
      $.ajax({
        url: '/get-destination-by-boarding-point?parameter=' + boardingPoint,
        method: 'GET',
        success: function (response) {
          $('#destination-div').show();
          let $select = $('#destinationSelector');
          $select.empty();
          // Add default option
          $select.append("<option value='' >Select Your Destinations</option>");
          // Add options from the array
          $.each(response, function (index, optionText) {
            let optionContent = `' data-destination='${optionText.destination}'>${optionText.destination} | Departure time: ${optionText.departureTime} Arrival Time: ${optionText.arrivalTime}`;
            $select.append(
              "<option value='" +
                optionText.id +
                "" +
                optionContent +
                '</option>'
            );
          });
        },
        error: function (error) {
          console.error('Error:', error);
        }
      });
    });
  
    // Ajax call for populating the seat and meal information.
    $('#destinationSelector').on('change', function () {
      $.ajax({
        url: '/get-seat-information?parameter=' + $(this).val(),
        method: 'GET',
        success: function (response) {
          $('#seat-div').show();
          let $seatSelector = $('#seatSelector');
          $seatSelector.empty();
          $seatSelector.append(
            "<option value=''>Select Your Seat Preference</option>"
          );
          let $mealSelector = $('#mealSelector');
          $mealSelector.empty();
          $mealSelector.append(
            "<option value=''>Select Your Meal Preference</option>"
          );
          $.each(response, function (index, optionText) {
            let seatOptionContent = `<option value='business' data-cost='${optionText.businessSeatCost}'> Business Class [Rate: ${optionText.businessSeatCost}]</option><option value='business' data-cost='${optionText.economySeatCost}'> Economy Class [Rate: ${optionText.economySeatCost}]</option>`;
            $seatSelector.append(seatOptionContent);
            let mealOptionContent = `<option value='true' data-cost='${optionText.mealCost}'> Yes [Rate: ${optionText.mealCost}]</option><option value='false' data-cost='0'> No [Rate: 0]</option>`;
            $mealSelector.append(mealOptionContent);
          });
        },
        error: function (error) {
          console.error('Error:', error);
        }
      });
    });
  
    // Listener function for listening to the meal selector button to set the button visibility.
    $('.cost').on('click change', function () {
      $('#submit-button').show();
      let seatCost = $('#seatSelector').find(':selected').data('cost');
      let mealCost = $('#mealSelector').find(':selected').data('cost');
      $('#summary').show();
      $('#summary').html(
        `<div class="form-group"><div class="col-md-12"><label for="total"> Total </label><input type="number" class="form-control" id="total" name="total" class="form-control" value="${seatCost+mealCost}" placeholder="Total Rate" disabled/></div></div>`
      );
    });
  
    
  });
  