var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RentRoom' });
});

router.post('/RentRoom', function(req, res, next) {
    axios.post('http://localhost:8096/RentRoomInManage',{
        id:req.body.id
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
