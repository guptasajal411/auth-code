const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://" + process.env.usernameMongoDB + ":" + process.env.password + "@cluster0.xgjts.mongodb.net/authCodeDB");

const userSchema = new mongoose.Schema({
    email: String
});

const User = new mongoose.model("User", userSchema);

//create a new user in User model
// const newBook = new User({ email: "email@example.com" });
// newBook.save();

module.exports = User;