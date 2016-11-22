var express = require('express');
var router = express.Router();

var Event = require('../models')['events'];
var Customer = require('../models')['customers'];

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

