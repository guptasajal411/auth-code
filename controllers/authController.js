const User = require("../models/userModel.js");

exports.postRegistration = function(req, res){
    console.log(req.body);
    res.send(`You are registered for Auth Code! Go to <a href="/">homepage</a>`);
}

exports.postLogin = function(req, res){
    console.log(req.body);
    res.send(`Logged in to Auth Code. Go to <a href="/">homepage</a>`);
}