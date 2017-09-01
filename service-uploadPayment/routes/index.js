var express = require('express');
var router = express.Router();
var mongjs = require('mongojs');
var db = mongjs('dev.iris.echoneet.space/Hackathon2017',['SlipPayment'])

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload Payment' });
});

router.post('/uploadPayment',function(req, res, next) {
    //console.log(req.body.img);
    db.SlipPayment.insert({"image":req.body.img},function (err,doc) {
        if(err){
            res.send("Error upload to db");
        }
        else {
            res.send("success");
        }
    });
});

module.exports = router;
