var mongoose = require('mongoose');
var shortid = require('shortid');


var DeveloperSchema = new mongoose.Schema({
    name       : String,
    slack_name : String,
    avatar_url : String,
    _id: {
      type: String,
      'default': shortid.generate
    }
});

module.exports = mongoose.model('Developer', DeveloperSchema);
