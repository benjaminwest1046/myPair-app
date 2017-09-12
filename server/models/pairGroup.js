var mongoose = require('mongoose');
var shortid = require('shortid');
var DeveloperSchema = require('mongoose').model('Developer').schema

var PairSchema = new mongoose.Schema({
  anchor         : DeveloperSchema,
  developer      : DeveloperSchema,
  third_developer: DeveloperSchema,
  resillience    : Boolean
});

module.exports = mongoose.model('Pair', PairSchema);


var PairGroupSchema = new mongoose.Schema({
  date : String,
  pairs: [PairSchema],
  _id: {
    type: String,
    'default': shortid.generate
  }
},
  { timeStamps: true }
);

module.exports = mongoose.model('PairGroup', PairGroupSchema);
