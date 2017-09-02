var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Slip',['SlipPayment']);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//getReportOnMonth
router.post('/getReportOnMonth', function(req, res, next) {
    let startMonth = new Date(req.body.month);
    let endMonth = new Date(startMonth.getFullYear(), startMonth.getMonth()+1,startMonth.getDay(),startMonth.getHours()+23,startMonth.getMinutes()+59,startMonth.getSeconds()+59);
    let username = req.body.username;
    console.log(startMonth)
    console.log(endMonth)
    console.log(req.body.username)
    db.SlipPayment.find({rentdate:{$gte:startMonth,$lt:endMonth},ownername:username},function (err, docs) {
        if(err !== null){
            res.status(500);
            res.send("database error");
        }
        else {
            console.log(docs);
            res.send(docs);
        }
    })

});

module.exports = router;
