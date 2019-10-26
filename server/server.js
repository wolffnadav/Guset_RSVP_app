// set up ======================================================================
const express = require('express')
    , app = express() 								// create our assets w/ express
    , bodyParser = require('body-parser')            // pull information from HTML POST (express4)
    , morgan = require('morgan')                     // log requests to the console (express4)
    , mongoose = require('mongoose') 				// mongoose for mongodb
    , config = require('./config/env.js')
    , port = config.process.port || 8080 			// set the port
    , Promise = require("bluebird")
    , helmet = require('helmet')
    ;
app.use(helmet());

let cors = require("cors");
app.use(cors());

Promise.promisifyAll(require("mongoose"));
mongoose.Promise = Promise; // remove deprecate warning

// change default size allowed for uploads.
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

// get our request parameters
app.use(bodyParser.urlencoded({extended: false}));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// log every request to the console
app.use(morgan(':date[web]'));
app.use(morgan('dev'));

// add timestamps in front of log messages
require('console-stamp')(console, {
    pattern: 'dd/mm-HH:MM:ss.l',
    colors: {
        stamp: "yellow",
        label: "blue",
        metadata: "green"
    }
});

// Exit application on error
mongoose.connection.on('error', err => {
    console.log(`Mongo connection error: ${err}`);
});

mongoose.connection.on('connected', () => {
    console.info('Mongo is ready for action');
});

// configuration ===============================================================
mongoose.connect(config.database.url, config.database.options); // connect to our database


// routes ======================================================================
require('./routes/main')(app, mongoose);

// launch ======================================================================
const server = app.listen(port);
console.log('The magic happens on port ' + port);

app.use(function (error, req, res, next) {
    //Catch json error
    if (error) {
        console.error("Bad request was made with an invalid json and error: " + error.message);
        res.json({error: "error"});
    } else {
        next();
    }
});


//todo git ignore - idea node_modole