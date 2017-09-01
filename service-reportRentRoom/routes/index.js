var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Hackathon2017',['SlipPayment']);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//getReportOnMonth
router.post('/test', function(req, res, next) {
    let startMonth = new Date(req.body.month);
    let endMonth = new Date(startMonth.getFullYear(), startMonth.getMonth()+1);
    console.log(startMonth)
    console.log(endMonth)
    db.SlipPayment.find({rentdate:{$gte:startMonth,$lt:endMonth}},function (err,docs) {
        console.log(docs);
        res.send(docs);
    })
});

module.exports = router;
