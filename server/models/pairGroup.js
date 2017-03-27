var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var pairSchema = new Schema({
  anchor         : String,
  developer      : String,
  third_developer: String,
  is_resillience : String
});

var Pair = mongoose.model('Pair', pairSchema)

mongoose.model['Pair'] = Pair

var PairGroupSchema = new mongoose.Schema({
  date : String,
  pairs: [mongoose.model["Pair"].schema]
},
  { timeStamps: true }
);

var PairGroup = mongoose.model('PairGroup', PairGroupSchema)

// PairGroupSchema.methods.toString = function() {
//   return "*******************************\n" +
//          "Id: " + this._id + "\n" +
//          "Date: " + this.date + "\n";
// };

module.exports = mongoose.model('PairGroup', PairGroupSchema);
