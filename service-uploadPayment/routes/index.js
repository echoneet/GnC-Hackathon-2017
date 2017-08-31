var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'publice/images/'})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload Payment' });
});

router.post('/uploadPayment',function(req, res, next) {
    console.log(req.body.img);
    res.send("success");
});

module.exports = router;
