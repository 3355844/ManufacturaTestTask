$(() => {
//  SOCKETS
    let socket = io();

    // GET USERS
    $('#getUsers').on('click', () => {
        console.log('get Users');
        $.ajax({
            url: '/users',
            method: 'GET',
            contentType: 'application/json',
            success: (res) => {
                let tbodyEL = $('tbody');
                tbodyEL.html('');
                res.users.forEach((user) => {
                    console.log('function res');
                    tbodyEL.append('\<tr>\
                        <td class="id">' + user._id + '</td>\
                        <td><input type="text" class="firstName form-control"  value="' + user._firstName + '"></td>\
                        <td><input type="text" class="lastName form-control" value="' + user._lastName + '"/></td>\
                        <td><input type="text" class="emailUser form-control" value="' + user._emailUser + '"/></td>\
                        <td><input type="text" class="phoneUser form-control" value="' + user._phoneUser + '"/></td>\
                        <td>\
                        <button class="update-button btn btn-success">UPDATE</button>\
                        <button class="delete-button btn btn-danger mt-2">DELETE</button>\
                        </td>\
                        </tr>');
                })
            }
        });
    });

    // CREATE USER
    $('#create-form').on('submit', (event) => {
        console.log('CREATE USER');
        let errorCount = 0;
        event.preventDefault();
        // Check fills
        $('#create-form').find('input').each((index, input) => {
            console.log(input.value);
            if (input.value === '') {
                errorCount++;
            }
        });
        //  Fills
        let fName = $('#firstName');
        let lName = $('#lastName');
        let email = $('#emailUser');
        let phone = $('#phoneUser');

        if (errorCount === 0) {
            $.ajax({
                url: '/users',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    firstName: fName.val(),
                    lastName: lName.val(),
                    emailUser: email.val(),
                    phoneUser: phone.val(),
                }),
                success: (res) => {
                    // Clear fills if user success create
                    fName.val('');
                    lName.val('');
                    email.val('');
                    phone.val('');
                    $('#getUsers').click();
                }
            });
        } else {
            alert('Fill all fields');
            $('#getUsers').click();
        }
    });

    // UPDATE USER
    $('table').on('click', '.update-button', function () {
        console.log('Update USER');
        let rowEL = $(this).closest('tr');
        let id = rowEL.find('.id').text();

        let newFirstName = rowEL.find('.firstName').val();
        let newLastName = rowEL.find('.lastName').val();
        let newEmail = rowEL.find('.emailUser').val();
        let newPhone = rowEL.find('.phoneUser').val();
        console.log("Id: " + id);
        console.log(newFirstName);
        console.log(newLastName);
        console.log(newEmail);
        console.log(newPhone);
        $.ajax({
            url: '/users/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                newFirstName: newFirstName,
                newLastName: newLastName,
                newEmail: newEmail,
                newPhone: newPhone
            }),
            success: function (res) {
                $('#getUsers').click();
            }
        });
    });

//     DELETE USER
    $('table').on('click', '.delete-button', function () {
        console.log('DELETE USER ');
        let rowEL = $(this).closest('tr');
        let id = rowEL.find('.id').text();
        $.ajax({
            url: '/users/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (res) {
                console.log(res);
                $('#getUsers').click();
            }
        });
    });
});