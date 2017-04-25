var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Developer = require('./developer');
var PairGroup = require('./pairGroup');

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
    return PairGroup.remove({})
})
.then(function() {
    var pair1 = 
        {
            anchor: "Benjamin",
            developer: "Christopher",
            third_developer: "Jessica",
            is_resillience: 'True'
        };
    var pairGroup1 = new PairGroup({
        date: '12/31/2019',
        pairs: pair1
    })
    return PairGroup.create(pairGroup1);
})
.then(function(savedPairGroup) {
   return PairGroup.find({});
})
.then(function(foundPairGroup) {
    console.log(foundPairGroup);
})
.then(function() {
    return Developer.remove({})
})
.then(function() {
    var dev1 = new Developer({name: "Benjamin"});
    var dev2 = new Developer({name: "Jessica"});
    var devArray = [dev1, dev2];
    return devArray.forEach(function(dev) {
        return Developer.create(dev);
    });
})
.then(function(savedDevs) {
    console.log('Saved Devs', savedDevs);
    return Developer.find({});
})
.then(function(devs) {
    console.log(devs);
})