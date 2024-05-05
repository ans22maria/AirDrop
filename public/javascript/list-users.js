$().ready(function () {
    // Ajax request for fetching the list of users in the database
    $.ajax({
      url: '/list-user',
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
            { data: 'name' },
            { data: 'phone_number' },
            { data: 'email' },
            { data: 'privilege' },
          ]
        });
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });
  