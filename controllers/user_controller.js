
var express = require('express');
var router = express.Router();

var calender = require('../models/events.js')

router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.redirect('/reserve')
});

router.get('/reserve', function (req, res){
  //displays calendar of available dates
  calender.findAll ({}).then(function(data){
    var calenderUnderRouterGetTwo = {
      customers: id,
      customers: name,
      customers: phone,
      customers: email,
      customers: numOfGuest,
      customers: createdAt,
      customers: updatedAt,
    };
    res.render('index', calenderUnderRouterGetTwo);
  }) 
});

//user end
router.post('/create/reservation', function (req, res){
  //takes in the information user inputs to reserve a booking
  var newDate = req.body. '';
  calenderInfoUnderRouterPost.create({
    calender_DB:newData
  });
  res.redirect('/reserve')
});

router.put('/update/reservation/:id', function (req, res){
  //user can update the information of reservation
  calenderInfoUnderRouterPut.update({
    booked: [req.body.booked],
},{
  where:{
    time: [req.params.id]
  }
}
});

router.delete('/delete/reservation/:id', function (req, res){
  //user can delete reservation

});
