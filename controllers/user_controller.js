var express = require('express');
var router = express.Router();
// var sequelize = require('sequelize');
var Event = require('../models')['Events'];
var User = require('../models')['Users'];
var passport = require('passport');
console.log(Event)

//index route
router.get('/', function (req, res){
  //asks to book a reservation or login with manager
  res.render('index');
});

//SIGN UP
router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', function(req, res){
  //creates new user from valid form
  //if the email exists
  console.log(req.body);

   User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  });

   res.redirect('login');
});

//LOGIN
router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  console.log(req.body);
  var enteredPswd = req.body.password;

  User.findAll({
    where: {
      email: req.body.email,
      $and: [
        {password: enteredPswd}
      ]
    }
    }).then(function(data){
      if(data){
        res.redirect('/master-test');
      } else{
        res.redirect('/login');
      }
    });
});

// router.post('/login', loginPostRoute);

// function loginPostRoute(req, res/*, next*/){
  // passport.authenticate('local', function(err, user, info){
  //   if(err){
  //     return next(err);
  //   }
  //   if(!user){
  //     req.session.messages=info.message;
  //     return res.redirect('/login');
  //   }

  //   req.logIn(user, function(err){
  //     if(err){
  //       req.session.messages="Error!";
  //       return next(err);
  //     }
  //     req.session.messages="Login successful!";
  //     return res.redirect('/manager');
  //   });
  // })(req, res, next);
// });


//LOGOUT
//we will need to make a log out page or modal for the below route.
router.get('/logout', logout)
  function logout(req, res){
    if(req.isAuthenticated()){
      req.logout();
      req.session.messages='Log out success!'
    }
      res.redirect('/');
  }


//need to add a route to authenticate the manager. see 2.5;
router.get('/manager', requireAuth, adminHandler)

function requireAuth(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/login');
  }
}

function adminHandler(req, res, next){
  res.render('manager', {});
};

//displays calendar of available dates
router.get('/reserve', function (req, res){
  Event.findAll({}).then(function(data){
    res.render('reserveUser');
  });
});

router.get('/manager-test', function(req,res){
  res.render('manager');
});

//takes in the information user inputs to reserve a booking
router.post('/create/reservation', function (req, res){
  User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });
  //updates reservation and decreases available spots
  // res.redirect('/update/reservation/:id/:spots');
  res.redirect('/reserve');
});

//user can update the information of reservation
// router.put('/update/reservation/:id/:spots', function (req, res){
//   Event.update({
//     availableSpots: (req.body.spots) - 1
// },{
//   where:{
//     time: req.params.id
//   }
//  });
// });

//user can delete reservation
// router.delete('/delete/reservation/:id', function (req, res){

//   Customer.destroy({
//     where: {
//       id: req.params.id
//     }
//   });

//   res.redirect('/reservation');
// });

//get customer information for the reservation
router.get('/customerInfo/:id', function(req, res){
  Customer.findAll({
    where: {
      id: req.params.id
    }
  });
});

//manager creates an event
router.post('/create/event', function(req, res){
  Event.create({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    location: req.body.location,
    availableSpots: req.body.availableSpots
  });

  res.redirect('/manager-test');
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
      id: req.params.id
    }
  });

  res.redirect('/manager');
});

//manager approves reservation
// router.put('/update/event/:id', function(req, res){
//   Event.update({
//     isPending: //false,
//     isReserved: //true
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
