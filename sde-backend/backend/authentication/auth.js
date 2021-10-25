const jwt = require("jsonwebtoken");

// Checks for authorization token in header and validates it

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get rid of "bearer"
    const decoded = jwt.verify(token, process.env.JWT_KEY); //verify incoming tokens and decode the user data
    req.userData = decoded; //if
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
