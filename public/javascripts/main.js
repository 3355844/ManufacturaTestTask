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
                var tbodyEL = $('tbody');
                tbodyEL.html('');
                res.users.forEach((user) => {
                    console.log('function res');
                    tbodyEL.append('\<tr>\
                        <td class="id">' + user._id + '</td>\
                        <td>' + user._firstName + '</td>\
                        <td><input type="text" class="name form-control" value="' + user._lastName + '"/></td>\
                        <td><input type="text" class="name form-control" value="' + user._emailUser + '"/></td>\
                        <td><input type="text" class="name form-control" value="' + user._phoneUser + '"/></td>\
                        <td>\
                        <button class="update-button btn btn-outline-success">UPDATE</button>\
                        <button class="delete-button btn btn-outline-danger">DELETE</button>\
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

});

