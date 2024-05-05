$().ready(function () {
  // Ajax request for fetching the list of flights
  $.ajax({
    url: '/list-flights',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);
      // Initializing DataTable
      $('#flightList').DataTable({
        data: response,
        columnDefs: [
          {
            target: 0,
            visible: false,
            searchable: false
          }
        ],
        columns: [
          { data: 'id' },
          { data: 'flightName' },
          { data: 'boardingPoint' },
          { data: 'destination' },
          { data: 'departureTime' },
          { data: 'arrivalTime' }
        ]
      });
    },
    error: function (xhr, status, error) {
      console.error(error); 
    }
  });
});
