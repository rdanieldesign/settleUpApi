var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index = require("./routes/index");
var users = require("./routes/users");
var bluebird = require("bluebird");
var mongoose = require("mongoose");
var api = require('./routes/api.route')

var app = express();

mongoose.Promise = bluebird;
mongoose.connect('mongodb://rdanieldesign:Ruby1989!M@settleupdb-shard-00-00-gj7jb.mongodb.net:27017,settleupdb-shard-00-01-gj7jb.mongodb.net:27017,settleupdb-shard-00-02-gj7jb.mongodb.net:27017/test?ssl=true&replicaSet=SettleUpDB-shard-0&authSource=admin')
  .then(() => {
    console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb+srv://rdanieldesign:Ruby1989!M@settleupdb-gj7jb.mongodb.net/test`)
  })
  .catch(() => {
    console.log(`Error Connecting to the Mongodb Database at URL : mongodb+srv://rdanieldesign:Ruby1989!M@settleupdb-gj7jb.mongodb.net/test`)
  })

app.use(function (req, res, next) {
  // TODO uncomment and change to local app later
  // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
