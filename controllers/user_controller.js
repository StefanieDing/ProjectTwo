var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
  //asks to book a reservation or login with manager
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

