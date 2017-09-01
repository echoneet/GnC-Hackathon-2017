var mongojs = require('mongojs');
var db = mongojs('dev.iris.echoneet.space/Hackathon2017',['Room','SlipPayment']);

db.Room.find(function (err,docs) {
    if(docs.length == 0){
        db.Room.insert({
            "name" : "บ้านป้าแย้ม",
            "location" : "71/1 ซอยสะอาด อ.เทพนิมิต จ.ลำปาง",
            "roomSize" : "3.50 X 7.00 ตร.ม.",
            "tel" : ["0829952348","02332323213"],
            "price" : 3000,
            "deposit" : "3 เดือน",
            "picture" : "https://doctorzone45.files.wordpress.com/2013/02/lagoon-access-room.jpg",
            "status" : "notReserved"

        })
        db.Room.insert({
            "name" : "คอนโดน้องยิ้ม",
            "location" : "45 ห้อง645 ชั้น 6 คอนโดคิงรี่ อ.เมือง จ.ลำปาง",
            "roomSize" : "6.00 X 9.00 ตร.ม.",
            "tel" : ["0915239642"],
            "price" : 4500,
            "deposit" : "3 เดือน",
            "picture" : "http://www.forfur.com/img/R4/l_306_bedroom19.jpg",
            "status" : "Reserved"
        })
        db.Room.insert({
            "name" : "บ้านริมน้ำศรีชัย",
            "location" : "60/12 ซอยกำแพงเหล็ก ต.ศรีดัดตน อ.สังขเทศ จ.ชลบุรี",
            "roomSize" : "5.50 X 5.00 ตร.ม.",
            "tel" : ["0872464996","0999999999"],
            "price" : 3200,
            "deposit" : "3 เดือน",
            "picture": "http://homes.payap.ac.th/info/wp-content/uploads/2015/06/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9E%E0%B8%B1%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A81.jpg",
            "status" : "notReserved"
        })
        db.Room.insert({
            "name" : "บ้านหรูใจกลางเมืองกระบี่",
            "location" : "55 บ้านริมเล ต.ทะเลเหนืแ อ.เมือง จ.กระบี่",
            "roomSize" : "45.50 X 35.00 ตร.ม.",
            "tel" : ["0879240192"],
            "price" : 20000,
            "deposit" : "3 เดือน",
            "picture":"https://www.movenpick.com/typo3temp/_processed_/csm_Pattaya_xxxxxxxxxx_i120042_05_ffbd5c9140.jpg",
            "status" : "notReserved"
        })
        db.Room.insert({
            "name" : "บ้านป้าแต๋วน้องยายสา พี่ตาศรี มีพื้นที่มากกว่า2บรรทัด",
            "location" : "602/12 อาคารเตมีศรีภูมิร่องนภาลัย ซอยท่าเหล็กกำแพงโล่ง ถ.อารามพรรษาพงศ์ดอนหลวง ต.สุมนธาราม อ.สิงหปราชัยปราการหลวง จ.อุบลราชธานี รหะสไปรษณี 1234567",
            "roomSize" : "7.50 X 15.00 ตร.ม.",
            "tel" : ["0873523332"],
            "price" : 3300,
            "deposit" : "6 เดือน",
            "picture": "http://4.bp.blogspot.com/-RSAdi3NMMs8/VakWj_znRcI/AAAAAAAAAMI/lp19iktRyCw/s1600/Rent%2Broom%2Bstockholm.jpg",
            "status" : "notReserved"
        })
        db.SlipPayment.insert({
            "rentername" : "MoJi",
            "room" : "บ้านป้าราตรี",
            "rentdate" : new Date("2017/08/17")
        })
        db.SlipPayment.insert({
            "rentername" : "Benz",
            "room" : "คอนโดหน้าซอยวัดร้าง",
            "rentdate" : new Date("2017/08/30")
        })
        db.SlipPayment.insert({
            "rentername" : "Coconut",
            "room" : "แสนระทมบ้านพัก",
            "rentdate" : new Date("2017/07/05")
        })
        console.log("initial data success")
    }
})