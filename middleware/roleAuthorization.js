const role = require("../schema/user");

module.exports.staffAuth = async (req, res, next) => {
  try {
      const token = req.header.authorization.split(" ")[1];
      const decodedToken = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
      if (!decodedToken) {
        res.status(401).json({
          message: "Unauthorized",
        });
      } else {
        if (decodedToken === "staff") {
          next();
        }else{
          res.status(401).json({
              message: "Unauthorized",
            });
        }
      }
    } catch (error) {
      res.json({
        message: error
      });
    }
  };
  module.exports.staffAuth = async (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        const decodedToken = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
        if (!decodedToken) {
          res.status(401).json({
            message: "Unauthorized",
          });
        } else {
          if (decodedToken === "staff") {
            next();
          }else{
            res.status(401).json({
                message: "Unauthorized",
              });
          }
        }
      } catch (error) {
        res.json({
          message: error
        });
      }
    };
    module.exports.staffAuth = async (req, res, next) => {
      try {
          const token = req.header.authorization.split(" ")[1];
          const decodedToken = JSON.parse(Buffer.from(token.split(".")[1], "base64"));
          if (!decodedToken) {
            res.status(401).json({
              message: "Unauthorized",
            });
          } else {
            if (decodedToken === "staff") {
              next();
            }else{
              res.status(401).json({
                  message: "Unauthorized",
                });
            }
          }
        } catch (error) {
          res.json({
            message: error
          });
        }
      };

module.exports = { userAuth, adminAuth, superAdminAuth };
