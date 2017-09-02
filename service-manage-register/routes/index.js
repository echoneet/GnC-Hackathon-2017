var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = mongojs.ObjectId;
var db = mongojs('dev.iris.echoneet.space/userdetail', ["userdata"]);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'UserManage'});
});

router.post('/findUser', function (req, res, next) {
    console.log("findUser")
    console.log(req.body.userdetail.id)
    //res.send("test");
    db.userdata.findOne({id: req.body.userdetail.id}, function (err, docs) {
        console.log(docs);
        if (docs === null) {
            db.userdata.insert(req.body.userdetail);
            db.userdata.findOne({id: req.body.userdetail.id}, function (err, docs) {
                res.send(docs);
            })
        }
        else {
            res.send(docs);
        }
    });
})

router.post('/getUserInfo', function (req, res, next) {
    console.log("getUserInfo" + req.body.id)
    db.userdata.findOne({_id: ObjectId(req.body.id)}, function (err, docs) {
        if (docs !== null) {
            res.send(docs.displayName)
        }
    })
})
module.exports = router;
