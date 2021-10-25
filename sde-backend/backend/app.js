const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const getEmployeeRouter = require("./apis/getEmployee");
const getEmployeesRouter = require("./apis/getEmployees");
const loginRoutes = require("./apis/login");

// Connects to mongodb atlas on the cloud
mongoose.connect(
  "mongodb+srv://ritwik:coconut@cluster0.2hnit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// Helps in logging
app.use(morgan("dev"));
//Helps in parsing incoming url requests
app.use(bodyParser.urlencoded({ extended: false }));
//Helps in parsing incoming json
app.use(bodyParser.json());

// Middlewares

// Routes the respective requests to their apis based on url
app.use("/getEmployees", getEmployeesRouter);
app.use("/getEmployee", getEmployeeRouter);
app.use("/auth", loginRoutes);

// Error handling using middlewares

app.use((req, res, next) => {
  console.log(req.url);
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
