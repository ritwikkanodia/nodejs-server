const express = require("express");
// express router to handle routing
const router = express.Router();

const mongoose = require("mongoose");

const Employee = require("../../database/models/employee");
const checkAuth = require("../authentication/auth");

// GET request to /getEmployee to fetch employee with a particular ID from the database

//parameter in url
router.get("/:employeeId", checkAuth, (req, res, next) => {
  //extracting the ID from url
  const id = req.params.employeeId;
  console.log(req.url);
  Employee.findById(id) // Finding employee by ID
    .select("name email _id")
    .exec()
    .then((doc) => {
      if (doc) {
        // checking if any employee is present with given ID
        res.status(200).json(doc); //asynchronous request therefore need to send the response from inside
      } else {
        res.status(404).json({ message: "No valid entry found for ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
