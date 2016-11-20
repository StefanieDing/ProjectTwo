var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.redirect('/reserve')
});

router.get('/reserve', function (req, res){
  //displays calendar of available dates
  calender.findAll ({}).then(function(data){
    var calenderUnderRouterGetTwo = {table: data
      table: name,
      table: time,
      table: duration
    };
    res.render('index', calenderUnderRouterGetTwo);
  }) 
});

//user end
router.post('/create/reservation', function (req, res){
  //takes in the information user inputs to reserve a booking
  var newDate = req.body. -calenderDB-;
  calenderInfoUnderRouterPost.create({
    -calenderDB-:newData
  });
  res.redirect('/reserve')
});

router.put('/update/reservation/:id', function (req, res){
  //user can update the information of reservation
  calenderInfoUnderRouterPut.update({
    booked: [req.body.devoured],
},{
  where:{
    time: [req.params.id]
  }

}
});

router.delete('/delete/reservation/:id', function (req, res){
  //user can delete reservation
});

