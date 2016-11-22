var express = require('express');
var router = express.Router();
// var app = express();
var Event = require('../models')['events'];
var User = require('../models')['users'];

// var methodOverride = require('method-override');
// app.use(methodOverride('_method'));
router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
});

router.get('/reserve', function (req, res){
  //displays calendar of available dates
  // calender.findAll ({}).then(function(data){
    res.render('calendarPage');
  //   };
  // });
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){

  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    numOfGuests: req.body.numOfGuests
  });
  //send to update isPending to true
  res.redirect('/update/reservation/:id');
});

router.put('/update/reservation/:id', function (req, res){
  //user can update the information of reservation
  Event.update({
    isPending: [req.body.isPending] //updates pending to true after customer info is entered
},{
  where:{
    id: [req.params.id]
  }
});
});

router.delete('/delete/reservation/:id', function (req, res){
  //user can delete reservation
  Customer.destroy({
    where: {
      id: [req.params.id]
    }
  });

  res.redirect('/reservation');
});

//manager login
router.get('/login/manager', function (req, res){
  //user auth for manager
  //login
  //res.redirect('/manager');
});

//manager homepage
router.get('/manager', function (req, res){
  Event.findAll({
    attributes: ['name', 'date', 'startTime', 'endTime', 'location', 'availableSpots']
  }).then(function(data){
    res.render('manager', data);
  })
});

//get customer information for the reservation
router.get('/customerInfo/:id', function(req, res){
  Customer.findAll({
    where: {
      id: [req.params.id]
    }
  });
});

//MANAGER VIEW
//enters in event details and spots available
router.post('/create/manager', function (req, res){
  Event.create({
    name: [req.body.name],
    date: [req.body.date],
    startTime: [req.body.startTime],
    endTime: [req.body.endTime],
    location: [req.body.location],
    availableSpots: [req.body.availableSpots]
  });

  res.redirect('/manager');
});

//allows manager to update calendar
router.put('/update/manager/:id', function(req, res){
  Event.update({
    //updated inputs
  },{
    where: {
      id: [req.params.id]
    }
  });

  res.redirect('/manager');
});

//manager approves reservation
router.put('/update/event/"id', function(req, res){
  Event.update({
    isPending: //false,
    isReserved: //true
  },{
    where: {
      id: [req.params.id]
    }
  });

  res.redirect('/manager');
});

//allows manager to delete event on calendar
router.delete('/delete/manager/:id', function(req, res){
  Event.destroy({
    where: {
      id: [req.params.id]
    }
  });

  res.redirect('/manager')
});

module.exports = router;