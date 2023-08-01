var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var jobsRouter = require("./routes/jobs");
var accountsRouter = require("./routes/accounts");

const connection = require("./config/db");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);
app.use("/accounts", accountsRouter);
connection.connect(function (err) {
   if (err) {
      return console.error("error: " + err.message);
   }

   console.log("Connected to the MySQL server.");
});

module.exports = app;
