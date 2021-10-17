const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://" + process.env.usernameMongoDB + ":" + process.env.password + "@cluster0.xgjts.mongodb.net/authCodeDB");

const userSchema = new mongoose.Schema({
    email: String,
    colourCombination: String
});

const User = new mongoose.model("User", userSchema);

module.exports = User;