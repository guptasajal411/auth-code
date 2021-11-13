const User = require("../models/userModel.js");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

exports.postRegistration = function(req, res) {
    User.findOne({ email: req.body.email }, async function(err, foundUser) {
        if (err) {
            res.send(err);
        } else {
            if (foundUser == null) {
                const newUser = new User({
                    email: req.body.email,
                    colourCombination: req.body.colourCombination
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
            if (foundUser) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.email,
                        pass: process.env.emailPassword
                    },
                    tls: { rejectUnauthorized: false }
                });
                var mailOptions = {
                    from: process.env.email,
                    to: foundUser.email,
                    subject: 'Your OTP by Auth Code',
                    html: '<h1>OTP by Auth Code</h1>OTP is: ' + otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false, digits: true })
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        res.send(error);
                    } else {
                        res.render("login", { message: "Email sent! Check your inbox for OTP" });

                    }
                });
            } else {
                res.render("login", { message: "emailNotFound" });
            }
        }
    });
}