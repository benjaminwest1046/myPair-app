var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Day = require('Day');

mongoose.connect('mongodb://localhost/days');

function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

Day.remove({})
.then(function() {
  console.log('removing old days...');
  return Day.remove({})
})
.then(function() {
  console.log('creating new days...');
  var dayOne = new Day({name: "Benjamin"});
  var dayTwo = new Day({name: "Jessica"});
  // dayOne.local = { name: 'Benjamin'};
  // let dayTwo = new Day();
  // dayTwo.local = { name: 'Jessica'};
  return [Day.create(dayOne), Day.create(dayTwo)];
})
.then(function(savedDay) {
  console.log('going in here')
  return Day.find({})
  quit();
});
