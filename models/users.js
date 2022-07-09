let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    login: String,
    password: String,
    token: String
});

let userModel = mongoose.model('users',userSchema);

module.exports = userModel;