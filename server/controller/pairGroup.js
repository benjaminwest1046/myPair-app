var express = require('express');
var router = express.Router();
var PairGroup = require('../models/pairGroup.js');

//GET ALL
router.get('/', function(req, res, next) {
  PairGroup.find({})
  .then(function(pairGroups) {
    res.json(pairGroups);
  }, function(err) {
    return next(err);
  });
});


//CREATE
router.post('/', function(req, res, next) {
  console.log(req.data);
  var pairGroup = new PairGroup({
    date: req.body.date,
    pairs: req.body.pairs
  });
  pairGroup.save()
  .then(function(saved) {
    res.json(pairGroup);
  }, function(err) {
    return next(err);
  });
});







module.exports = router;
