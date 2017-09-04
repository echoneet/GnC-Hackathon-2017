var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'SearchRoomService'});
});

router.get('/SearchRoom', function (req, res, next) {
    axios.get('http://roommanage:8096/SearchRoomInManage', {})
        .then(function (response) {
            console.log(response.data)
            res.send(response.data)
})
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });
});

router.post('/SearchRoom', function (req, res, next) {
    axios.post('http://roommanage:8096/SearchRoomInManage', {
        min: req.body.min,
        max: req.body.max
    })
        .then(function (response) {
            console.log(response.data)
            res.send(response.data)
        })
        .catch(function (error) {
            console.log(error);
            res.send(error)
        });
});

module.exports = router;
