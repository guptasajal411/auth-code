const express = require('express');
const app = express();

const authController = require("../controllers/authController");
const pageController = require("../controllers/pageController");

app
    .route("/")
    .get(pageController.getHomepage)
    .post(authController.postRegistration);

app
    .route("/registration")
    .get(pageController.getRegistration)
    .post(authController.postRegistration);

module.exports = app;