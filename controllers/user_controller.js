var express = require('express');
var router = express.Router();

var Event = require('../models')['events'];
var Customer = require('../models')['customers'];

router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
});

router.get('/reserve', function (req, res){
  //displays calendar of available dates
  // calender.findAll ({}).then(function(data){
    res.render('calendarPage'/*handlebars file*/);
  //   };
    
  // }) 
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){
  
  Customer.create({
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
}
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

