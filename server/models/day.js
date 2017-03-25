var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  name: { type: String}
});

DaySchema.methods.toString = function() {
  return "Id: " + this._id + "Name: " + this.name;
}

module.exports = mongoose.model('Day', DaySchema);
