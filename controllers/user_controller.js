
var express = require('express');
var router = express.Router();
// var app = express();
var Event = require('../models')['events'];
var User = require('../models')['users'];

//-----
router.get('/login', loginGetRoute){
  //the above line ended with a ; instead of { in the guide.This applies to all authentication related routes.

function loginGetRoute(req, res){
  if(req.user){
    //redirects if the user is already logged in.
    res.redirect('/');
  }
  else{
    res.render('login', {message: req.session.messages});
    //for the message object above, the message should be in the html/handlebars. The example followed used a different rendering engine so this could change.
    req.session.messages = null;
  }
}
};

router.post('/login', loginPostRoute){
  function loginPostRoute(req, res, next){
    passport.authenticate('local', function(err, user, info){
      if(err){
        return next(err);
      }
      if(!user){
        req.session.messages=info.message;
        return res.redirect('/login');
      }

      req.logIn(user, function(err){
        if(err){
          req.session.messages="Error!";
          return next(err);
        }
        req.session.messages="Login successful!";
        return res.redirect('/');
      });
    })(req, res, next);
  }
}

//we will need to make a log out page or modal for the below route.
router.get('/logout', logout){
  function logout(req, res){
    if(req.isAuthenticated()){
      req.logout();
      req.session.messages='Log out success!'
    }
      res.redirect('/');
  }
}

//need to add a route to authenticate the manager. see 2.5;
router.get('/manager', requireAuth, adminHandler){
  function requireAuth(req, res, next){
    if()
  }
}
//-----

<<<<<<< HEAD
var calender = require('../models/events.js')

router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.redirect('/reserve')
=======
// var methodOverride = require('method-override');
// app.use(methodOverride('_method'));
router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
>>>>>>> 30837fafda901536a1e12ddef1b29d23de90940f
});

router.get('/reserve', function (req, res){
  //displays calendar of available dates
<<<<<<< HEAD
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
=======
  // calender.findAll ({}).then(function(data){
    res.render('calendarPage');
  //   };
  // });
>>>>>>> 30837fafda901536a1e12ddef1b29d23de90940f
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){
<<<<<<< HEAD
  //takes in the information user inputs to reserve a booking
  var newDate = req.body. '';
  calenderInfoUnderRouterPost.create({
    calender_DB:newData
  });
  res.redirect('/reserve')
=======

  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    numOfGuests: req.body.numOfGuests
  });
  //send to update isPending to true
  res.redirect('/update/reservation/:id');
>>>>>>> 30837fafda901536a1e12ddef1b29d23de90940f
});

router.put('/update/reservation/:id', function (req, res){
  //user can update the information of reservation
<<<<<<< HEAD
  calenderInfoUnderRouterPut.update({
    booked: [req.body.booked],
},{
  where:{
    time: [req.params.id]
  }
}
=======
  Event.update({
    isPending: [req.body.isPending] //updates pending to true after customer info is entered
},{
  where:{
    id: [req.params.id]
  }
});
>>>>>>> 30837fafda901536a1e12ddef1b29d23de90940f
});

router.delete('/delete/reservation/:id', function (req, res){
  //user can delete reservation
<<<<<<< HEAD

});
=======
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
>>>>>>> 30837fafda901536a1e12ddef1b29d23de90940f
