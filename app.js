var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var accountsRouter = require("./routes/accountRouter");
var categoryRouter = require("./routes/categoryRouter");
var subCategoryRouter = require("./routes/subCategoryRouter");
var jobRouter = require("./routes/jobRouter");

const connection = require("./config/db");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/accounts", accountsRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/job", jobRouter);

// view
app.set("view engine", "ejs");

module.exports = app;
