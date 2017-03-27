var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var PairGroup = require('./server/models/pairGroup');

mongoose.connect('mongodb://localhost/pairGroup');

function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

PairGroup.remove({})
.then(function() {
  var pairGroupOne = new PairGroup({ date: '12/31/2019', pairs: [{ anchor: "Benjamin", developer: "Jessica"}, { anchor: "Chip", developer: "Dale"}]  });
  return PairGroup.create(pairGroupOne);
})
.then(function(savedPairGroups) {
  return PairGroup.find();
})
.then(function(pairGroups){
  console.log(pairGroups.pairs)
  pairGroups.forEach(function(pg) {
    console.log(pg);
  })
  quit();
})

//JUST NEED TO TRY TO ADD PAIRS TO THE SEED FILE
