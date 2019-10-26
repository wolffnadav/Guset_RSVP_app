const guest = require('../../models/wedding_contact');
module.exports = function (app) {
    /** Wedding data **/
    app.get('/api/data', getTotalNumberOfGuests);
};
getTotalNumberOfGuests();

function getTotalNumberOfGuests(req, res) {
    var total_number_of_guests = 0;

    guest.find({$and: [{"number_of_guests": {$gte: 0}}]}, function (err, users) {
        console.log("getTotalNumberOfGuests:  " + users.length + " users answered");

        users.forEach(function (user) {
                total_number_of_guests += user.number_of_guests;
            }
        )
        console.log("total_number_of_guests coming is: " + total_number_of_guests);
    }).catch((err) => {
        console.error('error getTotalNumberOfGuests: ' + err);
    });
    return total_number_of_guests;

}

getUsersNotAnswer();

function getUsersNotAnswer(req, res) {
    var not_answered = 0;
    guest.find({$and: [{"number_of_guests": -1}, {sms_counter: 1}]}, function (err, users) {
        console.log("getUsersNotAnswer:  " + users.length + " users found");
    }).catch((err) => {
        console.error('error getUsersNotAnswer: ' + err);
    });
    return not_answered;

}