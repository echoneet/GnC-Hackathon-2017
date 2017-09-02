var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Hackathon2017',['Room']);
var ObjectId = mongojs.ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ManageRoom' });
});

router.get('/SearchRoomInManage',function (req,res,next) {

  db.Room.find(function (err, docs) {
      if (err !== null){
          res.status(500);
          res.send('database error')
      }
      else{
          console.log(docs);
          res.send(docs);
      }
      // docs is an array of all the documents in Room
  })

})

router.post('/SearchRoomInManage',function (req,res,next) {
    console.log(req.body);
    db.Room.find({price:{$gte:req.body.min,$lte:req.body.max},status:"notReserved"}).sort({price:1},function (err,docs) {
        if (err !== null){
            res.status(500);
            res.send('database error')
        }
        else{
            console.log(docs);
            res.send(docs);
        }
    })

})

router.post('/RentRoomInManage', function(req, res, next) {
    console.log(req.body.id);
    console.log(req.body.renter)
    db.Room.update(
        { _id: ObjectId(req.body.id) },
        { $set: { "status": "Reserved" ,"renter": req.body.renter} }
        ,function (err, doc, lastErrorObject) {
            if (err !== null){
                res.status(500);
                res.send('database error')
            }
            else{
                console.log(doc)
                if(doc.nModified === 1){
                    res.send("Reserved");
                }
                else {
                    res.send("ห้องถูกจองแล้ว 55555555555")
                }
            }
        })
});

module.exports = router;
