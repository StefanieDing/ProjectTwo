var express = require('express');
var router = express.Router();
// var app = express();
var Event = require('../models')['Events'];
var User = require('../models')['Users'];

//index page to either book a reservation or login as admin
router.get('/', function (req, res){
  res.render('index');
});

//displays calendar of available dates
router.get('/reserve', function (req, res){
  // Event.findAll ({}).then(function(data){
    res.render('calendarPage');
  //   };
  // });
});

//manager login
router.get('/login/manager', function (req, res){
  //user auth for manager
  //login
  //res.redirect('/manager');
});

//manager homepage
router.get('/manager', function (req, res){
  // Event.findAll({
  //   attributes: ['name', 'date', 'startTime', 'endTime', 'location', 'availableSpots']
  // }).then(function(data){
    res.render('manager'/*, data*/);
  // })
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){

  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });
  //updates reservation and decreases available spots
  res.redirect('/update/reservation/:id/:spots');
});

router.put('/update/reservation/:id/:spots', function (req, res){
  //user can update the information of reservation
  Event.update({
    availableSpots: (req.params.spots) - 1
},{
  where:{
    id: req.params.id
  }
});
});

// router.delete('/delete/reservation/:id', function (req, res){
//   //user can delete reservation
//   User.destroy({
//     where: {
//       id: [req.params.id]
//     }
//   });

//   res.redirect('/reservation');
// });

//get customer information for the reservation
router.get('/customerInfo/:id', function(req, res){
  User.findAll({
    where: {
      id: req.params.id
    }
  });
});

//enters in event details and spots available
router.post('/create/manager', function (req, res){

  Event.create({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    availableSpots: req.body.availableSpots
  });

  res.redirect('/manager');
});

//allows manager to update calendar
router.put('/update/manager/:id', function(req, res){
  Event.update({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    availableSpots: req.body.availableSpots
  },{
    where: {
      id: [req.params.id]
    }
  });

  res.redirect('/manager');
});

//manager approves reservation
// router.put('/update/event/:id', function(req, res){
//   Event.update({
//     isPending: 0,//false,
//     isReserved: 1//true
//   },{
//     where: {
//       id: [req.params.id]
//     }
//   });

//   res.redirect('/manager');
// });

//allows manager to delete event on calendar
router.delete('/delete/manager/:id', function(req, res){
  Event.destroy({
    where: {
      id: req.params.id
    }
  });

  res.redirect('/manager')
});

module.exports = router;