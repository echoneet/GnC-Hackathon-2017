var express = require('express');
var router = express.Router();
var axios = require('axios');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCaasg74VDRcixoa8Sphu7xNgBbkNS-kmA'
});

/* GET home page. */
router.get('/getFromLatLng/:lat/:lng', function (req, res, next) {
    console.log(req.params.lat)
    console.log(req.params.lng)
    var location = [req.params.lat, req.params.lng]
    var latlng = {lat: parseFloat(location[0]), lng: parseFloat(location[1])};

    googleMapsClient.reverseGeocode({latlng: latlng,language: 'th'}
    , function(err, response) {
        if (!err) {
            let namelist = [];
            response.json.results[0].address_components.forEach(address => {
                if(address.types.includes('political'))
                    namelist.push(address.long_name)
            });
            axios.post('http://localhost:8096/SearchRoomLatLong',{
                location:{result : namelist[namelist.length-3] + " " +namelist[namelist.length-2]}
            })
                .then(function (response) {
                    console.log(response.data)
                    res.send(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
            //res.send(JSON.stringify({result : namelist[namelist.length-3] + " " +namelist[namelist.length-2]}))
        }
    });
});

module.exports = router;