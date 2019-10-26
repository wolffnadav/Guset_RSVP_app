const
    config = require('../../config/env')
    , Promise = require("bluebird")
    , guest = require('../../models/wedding_contact')
    , sg = require('sendgrid')(config.SENDGRID_API_KEY)

;

module.exports = function (app) {

    // =====================================
    // USER REST API  ======================
    // =====================================

    /** Wedding DB **/
    app.post('/api/wedding', updateGuestList);
};

function sendMail(user_name, phone, number) {
    return new Promise(function (resolve, reject) {
        const data = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": config.email,
                            "name": config.name
                        }
                    ],
                    "subject": "Wedding Invitations List Updated"
                }
            ],
            "from": {
                "email": "admin@wedding.io",
                "name": "Wedding Admin"
            },
            "content": [
                {
                    "type": "text/html",
                    "value": `Hey <b>${config.name}</b>,

                                    <p>friend: ${user_name} ,<br>
                                     phone: ${phone} ,<br>
                                     brings ${number} ppl to the wedding</p>

                                     <p>Yours,<br>
                                     The Wedding Admin :)</p> 
        `
                }
            ]
        };

        let email_request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: data
        });

        sg.API(email_request, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        })

    });
}


function sendFail(user_id) {
    return new Promise(function (resolve, reject) {
        const data = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": config.email,
                            "name": config.name
                        }
                    ],
                    "subject": "Wedding Invitations List Error"
                }
            ],
            "from": {
                "email": "admin@wedding.io",
                "name": "Wedding Admin"
            },
            "content": [
                {
                    "type": "text/html",
                    "value": `Hey <b> ${config.name}</b>,

                                    <p>There is a problem in: ${user_id} ,<br>

                                     <p>Yours,<br>
                                     The Wedding Admin :)</p> 
        `
                }
            ]
        };

        let email_request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: data
        });

        sg.API(email_request, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        })

    });
}

function updateGuestList(req, res) {
    const number_of_guests = req.body.number_of_guests;
    const user_name = req.body.name;
    const id = req.body.id;
    console.log("starting update, id is: " + id + "\n name is: " + user_name + ", number_of_guests bringing: " + number_of_guests);
    guest.findOneAndUpdate(
        {'_id': id},
        {
            $set: {
                number_of_guests: number_of_guests,
            }
        })
        .then((guest) => {
            console.log("id is: " + id);
            console.log(`user: ${guest.name} with phone: ${guest.phone} updated to: ${number_of_guests} guests`);
            return sendMail(guest.name, guest.phone, number_of_guests);
        })
        .then((response) => {
            res.json({success: true});
        })
        .catch((err) => {
            console.error(err);
            console.error(`error user id: ${req.body.id}`);
            sendFail(req.body.id);
            res.json({success: false});
        })
}
