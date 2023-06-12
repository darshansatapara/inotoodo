const jwt = require("jsonwebtoken");
const JWT_secret = "hellomylife$code";

const fatchuser = (res, req, next) => {
  //get token from the jwt token  and add id to req join
  const token = req.header("auth-token");

  if (!token) {
    res.status(200).send('Success'); 
  }
  try {
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(200).send('Success'); 
  }
};

module.exports = fatchuser;
