const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Employee = require("../../database/models/employee");

// POST request to '/auth/signup' for employee signup

router.post("/signup", (req, res, next) => {
  Employee.find({ email: req.body.email })
    .exec()
    .then((employee) => {
      if (employee.length >= 1) {
        return res.status(409).json({
          // Avoiding duplicate email adress
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          // 10 is the number of salting rounds
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const employee = new Employee({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash, // Do not want to store the password in database as text. Encrypting using bcrypt
            });
            employee
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "employee created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

// POST request to '/auth/login' for employee login and token generation

router.post("/login", (req, res, next) => {
  Employee.find({ email: req.body.email })
    .exec()
    .then((employee) => {
      if (employee.length < 1) {
        // if no employees are registered
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, employee[0].password, (err, result) => {
        //checking if password matches
        if (err) {
          return res.status(401).json({
            // wrong password
            message: "Auth failed",
          });
        }
        if (result) {
          // right password
          const token = jwt.sign(
            {
              email: employee[0].email,
              employeeId: employee[0]._id, // database id of employee
            },
            process.env.JWT_KEY, // private key
            {
              expiresIn: "1h", // for security reason
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
