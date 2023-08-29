
const mongoose = require('mongoose');
// connect from mongodb
// mongoose.connect('mongodb://0.0.0.0:27017/Employee-Review-System');
mongoose.connect(`mongodb+srv://shaik22arshad:mHHWfg9K2XzCk1lV@cluster0.wqo0hra.mongodb.net/?retryWrites=true&w=majority`);

// aquire connection if it is succesful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log("successfully connected to database!");
});

module.exports = db;