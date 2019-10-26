module.exports = function (app, mongoose) {

    // =====================================
    // REST API  ===========================
    // =====================================

    require('./user/users.js')(app);

    require('./user/data_base.js')(app);

};
