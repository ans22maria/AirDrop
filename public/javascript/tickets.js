$().ready(function () {
    // Ajax request for fetching the list of users in the database
    $.ajax({
      url: '/list-tickets',
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        // Initializing DataTable
        $('#userList').DataTable({
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
            { data: 'user_id' },
            { data: 'boardingPoint' },
            { data: 'destination' },
            { data: 'travelDate' },
          ]
        });
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });
  