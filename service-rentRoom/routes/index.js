var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Hackathon2017',['Room']);
var ObjectId = mongojs.ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RentRoom' });
});

router.post('/RentRoom', function(req, res, next) {
  console.log(req.body.id);
    db.Room.update(
        { _id: ObjectId(req.body.id) },
        { $set: { "status": "Reserved" } }
        ,function (err, doc, lastErrorObject) {
          console.log(doc)
          if(doc.nModified === 1){
            res.send("Reserved");
          }
          else {
            res.send("ห้องถูกจองแล้ว 55555555555")
          }

        })
});

module.exports = router;
