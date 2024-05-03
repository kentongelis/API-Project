// TODO: Set up your Mongoose connection here.

const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://localhost/rainbowapi';
mongoose.connect(
    url,
    {
        useNewUrlParser : true, useUnifiedTopology: true,
    },
    function(err, db) {
        assert.equal(null, err);
        console.log('Connected successfully to database')
    }
);
mongoose.connection.on('error', console.error.bind(console, "MongoDB connection Error:"))
mongoose.set('debug', true);

module.exports = mongoose.connection;