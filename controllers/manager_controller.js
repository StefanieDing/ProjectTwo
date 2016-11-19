var express = require('express');
var router = express.Router();

//manager end
router.get('/login/manager', function (req, res){
  //user auth for manager
});

router.post('/create/manager', function (req, res){
  //depending how api works, enters in reservations and spots available
});

router.put('/update/manager/:id', function(req, res){
  //allows manager to update calendar
});

router.delete('/delete/manager/:id', function(req, res){
  //allows manager to delete event on calendar
});

//include option where manager can approve event before it is set.