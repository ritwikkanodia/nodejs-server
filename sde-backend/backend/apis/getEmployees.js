const express = require("express");
// express router to handle routing
const router = express.Router();

const mongoose = require("mongoose");

const Employee = require("../../database/models/employee");
const checkAuth = require("../authentication/auth");

// GET request to /getEmployees to fetch all employees ndetails from the database

router.get("/", checkAuth, (req, res, next) => {
  Employee.find() // find all employees as no condition specified
    .select("name email _id") // retrieve only these field
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        employees: docs.map((doc) => {
          return {
            name: doc.name,
            email: doc.email,
            _id: doc._id,
            request: {
              // for verification
              type: "GET",
              url: "http://localhost:3000/getEmployees/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
