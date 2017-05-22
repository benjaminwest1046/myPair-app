var mongoose = require('mongoose');
var shortid = require('shortid');

var PairSchema = new mongoose.Schema({
  anchor         : String,
  developer      : String,
  third_developer: String,
  is_resillience : String
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
