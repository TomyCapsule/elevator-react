let mongoose = require('mongoose');

let actionsSchema = mongoose.Schema({
    actionType: String,
    floor: String
})

let actionsModel = mongoose.model('actions',actionsSchema);

module.exports = actionsModel;
