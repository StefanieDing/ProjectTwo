var express = require('express');
var router = express.Router();
// var calender = require('../models/calender.js');

router.get('/reserve', function (req, res){
  //asks to book a reservation or login with manager
});

// router.get('/calender', function(req, res){
//   calender.findAll().then(function(data){
//   var calenderUnderRouterGetTwo = {table: id,
//                 table: name,
//                 table: time,
//                 table: duration
//                   };
//   res.render('index', calenderUnderRouterGetTwo);
//   });
// });

var stuff = require('../models/events.js');

router.get('/events', function(req, res){
  stuff.findAll().then(function(data){
  res.render('index', data);
  });
});

router.get('/reserve', function (req, res){
  //displays calendar of available dates
});

//user end
router.post('/create/reservation', function (req, res){
  //takes in the information user inputs to reserve a booking
});

router.put('/update/reservation/:id', function (req, res){
  //user can update the information of reservation
});

router.delete('/delete/reservation/:id', function (req, res){
  //user can delete reservation
});

