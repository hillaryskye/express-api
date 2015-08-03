var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var Swords = db.get('swords');

router.get('/', function(req, res) {
  Swords.find({}, function(err, swords) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(swords);
  })
});

router.post('/', function(req, res) {
  Swords.insert(req.body, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(sword);
  });
})

router.post('/:id/delete', function(req, res) {
  Swords.remove({ _id: req.params.id}, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(200).send('deleted');
  })
})

router.get('/:id', function(req, res) {
  Sword.findOne({_id: req.params.id}, function(err, sword) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(sword)
  })
})

router.put('/:id', function(req, res) {
  Swords.findAndModify({_id: req.params.id}, req.body, function(err, sword) {
    if (err) {
      throw err
    }
    res.json(req.body)
  })
})



module.exports = router
