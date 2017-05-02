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

//CREATE
// router.post('/', function(req, res, next) {
//   var developer = new Developer({
//     name: req.body.name,
//     slack_name: req.body.slack_name,
//     avatar_url: req.body.avatar_url
//   });
//   developer.save()
// })

module.exports = router;
