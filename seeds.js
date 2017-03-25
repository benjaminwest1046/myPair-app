var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Day = require('./server/models/day');

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
  let dayOne = new Day();
  dayOne.local = { date: 'WORK'};
  return Day.create(dayOne);
})
.then(function(savedDay) {
  return Day.find({})
}).then(function(days){
  console.log(days);
})

