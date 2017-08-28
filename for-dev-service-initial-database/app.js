var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Hackathon2017',['Room']);

db.Room.find(function (err,docs) {
    if(docs.length == 0){
        db.Room.insert({
            "name" : "บ้านป้าแย้ม",
            "location" : "71/1 ซอยสะอาด อ.เทพนิมิต จ.ลำปาง",
            "tel" : "0829952348",
            "price" : 3000
        })
        db.Room.insert({
            "name" : "คอนโดน้องยิ้ม",
            "location" : "45 ห้อง645 ชั้น 6 คอนโดคิงรี่ อ.เมือง จ.ลำปาง",
            "tel" : "0915239642",
            "price" : 4500
        })
        db.Room.insert({
            "name" : "บ้านริมน้ำศรีชัย",
            "location" : "60/12 ซอยกำแพงเหล็ก ต.ศรีดัดตน อ.สังขเทศ จ.ชลบุรี",
            "tel" : "0872464996",
            "price" : 3200
        })
        console.log("initial data success")
    }
})