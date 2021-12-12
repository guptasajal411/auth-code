const User = require("../models/userModel.js");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
var smtpTransport = require('nodemailer-smtp-transport');

exports.postRegistration = function(req, res) {
    User.findOne({ email: req.body.email }, async function(err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser == null) {
                const newUser = new User({
                    email: req.body.email,
                    colourCombination: req.body.colourCombination,
                    currentOTP: 0
                });
                newUser.save();
                res.send(`You are registered for Auth Code! Go to <a href="/">homepage</a>`);
            } else {
                res.send(`Email already exists. Go to <a href="/">homepage</a>`);
            }
        }
    });
}

exports.postLogin = function(req, res) {
    User.findOne({ email: req.body.email }, async function(err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser == null) {
                res.render("login", { message: "emailNotFound" });
            } else {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: process.env.email,
                        pass: process.env.emailPassword
                    },
                    tls: { rejectUnauthorized: false }
                });
                const OTP = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false, digits: true });
                var mailOptions = {
                    from: process.env.email,
                    to: foundUser.email,
                    subject: 'Your OTP by Auth Code',
                    html: '<h1>OTP by Auth Code</h1>OTP is: ' + OTP
                };
                transporter.sendMail(mailOptions, async function(error, info) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.render("login", { message: "Email sent! Check your inbox for OTP", userEmail: foundUser.email });
                        foundUser.currentOTP = OTP;
                        await foundUser.save();
                    }
                });
            }
        }
    });
}

exports.postOTP = function(req, res) {
    User.findOne({ email: req.body.email }, async function(err, foundUser){
        if (err){
            res.send(err);
        } else {
            if (req.body.OTP == foundUser.currentOTP){
                foundUser.currentOTP = 0;
                await foundUser.save();
                res.render("success");
            } else if(req.body.colourCombination == foundUser.colourCombination) {
                foundUser.currentOTP = 0;
                await foundUser.save();
                res.render("success");
            } else {
                foundUser.currentOTP = 0;
                await foundUser.save();
                res.render("login", { message: "invalidOTP" });
            }
        }
    });
}