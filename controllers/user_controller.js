var express = require('express');
var router = express.Router();
// var sequelize = require('sequelize');
var Event = require('../models')['Events'];
var User = require('../models')['users'];
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

//LOGIN
router.get('/login', loginGetRoute);
  //the above line ended with a ; instead of { in the guide.This applies to all authentication related routes.

function loginGetRoute(req, res){
  if(req.user){
    //redirects if the user is already logged in.
    res.redirect('login');
  }
  else{
    res.render('/', {message: req.session.messages});
    //for the message object above, the message should be in the html/handlebars. The example followed used a different rendering engine so this could change.
    req.session.messages = null;
  }
};
// equivalent to above
// router.get('/login', function(req,res){
//   if(req.user){
//     //redirects if the user is already logged in.
//     res.redirect('/');
//   }
//   else{
//     //for the message object above, the message should be in the html/handlebars. The example followed used a different rendering engine so this could change.
//     req.session.messages = null;
//     res.render('login', {message: req.session.messages});
//   }
// });

router.post('/login', loginPostRoute);

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
    email: req.body.email,
  });
  //updates reservation and decreases available spots
  res.redirect('/update/reservation/:id/:spots');
});

//user can update the information of reservation
router.put('/update/reservation/:id/:spots', function (req, res){
  Event.update({
    availableSpots: (req.body.spots) - 1
},{
  where:{
    time: req.params.id
  }
 });
});

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
