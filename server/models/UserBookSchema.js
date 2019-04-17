var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserBookSchema = new Schema(
    {
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        bookname: {type: String, required: true, max:100},
    }
);

//Export model
module.exports = mongoose.model('userBook', UserBookSchema);