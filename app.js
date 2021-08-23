require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const authRoutes=require('./routes/index');
const uri = process.env.ATLAS_URI;
console.log(uri);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
mongoose.set("useCreateIndex", true);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Dhruv",
  resave: false,
  saveUninitialized: false
}));


app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(authRoutes);

app.listen(3000, function() {
  console.log("Server is running");
});