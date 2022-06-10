const jwt = require("jsonwebtoken");
 
module.exports.authenticate = (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false, err : err});
    } else {
      next();
    }
  });
}

