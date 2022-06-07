const role = require("../schema/user");

const userAuth = function (req, res, next) {
  const token = req.headers["Bearer Token"].split(" ")[1];
  const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
  try {
    if (!decodedToken.role === "user") {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    res.status(403).json({
      error: error,
    });
  }
};
const adminAuth = function (req, res, next) {
  const token = req.headers["Bearer Token"].split(" ")[1];
  const decodedToken = JSON.parse(Buffer.from(token.split(".")[1]));
  try {
    if (!decodedToken.role === "admin") {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    res.status(403).json({
      error: error,
    });
  }
};
const superAdminAuth = function (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).send("token doesn't exist. ");
    } else {
      const myToken = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      console.log(myToken.role);
      if (myToken.role != "super-admin") {
        res.status(401).send("Unauthorized user");
      }
      next();
    }
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = { userAuth, adminAuth, superAdminAuth };
