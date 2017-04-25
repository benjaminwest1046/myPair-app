var mongoose = require('mongoose');

var DeveloperSchema = new mongoose.Schema({
    name       : String,
    slack_name : String,
    avatar_url : String
});

module.exports = mongoose.model('Developer', DeveloperSchema);