var express = require('express');
var router = express.Router();
var Developer = require('../models/developer.js');
var fs = require('fs');

//GET ALL
router.get('/', function(req, res, next) {
  Developer.find({})
  .then(function(developers) {
    res.json(developers);
  }, function(err) {
    return next(err);
  });
});

// //Create
// router.post('/', function(req, res, next) {
//   var developer = new Developer({
//     name: req.body.name,
//     slack_name: req.body.slack_name,
//     avatar_url: req.body.avatar_url
//   });
//   return developer.save();
// })
// .then(function(developer) {
//   return res.json(developer);
// }, function(err) {
//   return next(err);
// });

router.put('/:id', function(req, res, next) {
  Developer.findById(req.params.id)
  .then(function(developer) {
    if (!developer) {
      developer = new Developer({
        name: req.body.name,
        slack_name: req.body.slack_name,
        avatar_url: req.body.avatar_url,
      })
    } else {
        developer.name = req.body.name;
        developer.slack_name = req.body.slack_name;
        developer.avatar_url = req.body.avatar_url;
    }
    return developer.save();
  })
  .then(function(developer) {
    return res.json(developer);
  }, function(err) {
    return next(err);
  });
});

router.delete('/:id', function(req, res, next) {
  Developer.findById(req.params.id)
  .then(function(developer) {
    if (!developer) return console.log('Cannot find developer');
    return Developer.remove({_id: developer._id});
  })
  .then(function() {
    res.status(204).end();
  }, function(err) {
    return next(err);
  });
});

module.exports = router;


//DONE: delete
//TODO: Sort by developer name in the end point
