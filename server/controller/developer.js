var express = require('express');
var router = express.Router();
var Developer = require('../models/developer.js');

//GET ALL
router.get('/', function(req, res, next) {
  Developer.find({})
  .then(function(developers) {
    res.json(developers);
  }, function(err) {
    return next(err);
  });
});


router.put('/:id', function(req, res, next) {
  Developer.findById(req.params.id)
  .then(function(developer) {
    console.log(developer);
    if (!developer) return next(makeError(res, 'Developer not found', 404));
    developer.name = req.body.name;
    developer.slack_name = req.body.slack_name;
    developer.avatar_url = req.body.avatar_url;
    console.log('controller going');
    return developer.save();
  })
  .then(function(developer) {
    res.json(developer);
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
