const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
    phone: {type: String, unique: true},
    name: String,
    number_of_guests: {type: Number, default: -1},
    sms_counter: {type: Number, default: 0},
    short_url:{type: String, default: ''}
});

module.exports = mongoose.model('users', contactSchema);

