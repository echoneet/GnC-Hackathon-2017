var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Hackathon2017',['Room']);
db.connect;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SearchRoomService' });
});

router.get('/searchRoom', function(req, res, next) {
    db.Room.find(function (err, docs) {
        console.log(docs);
        res.send(docs);
        // docs is an array of all the documents in Room
    })
});

router.post('/searchRoom', function(req, res, next) {
    db.Room.find({price:{$gte:req.body.min,$lte:req.body.max}},function (err,docs) {
        console.log(docs);
        res.send(docs);
    })
});

module.exports = router;
