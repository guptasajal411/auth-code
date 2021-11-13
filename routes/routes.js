const express = require('express');
const app = express();

const authController = require("../controllers/authController");
const pageController = require("../controllers/pageController");

app
    .route("/")
    .get(pageController.getHomepage)

app
    .route("/registration")
    .get(pageController.getRegistration)
    .post(authController.postRegistration);

app
    .route("/login")
    .get(pageController.getLogin)
    .post(authController.postLogin);

module.exports = app;