const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT_secret = "hellomylife$code";
const jwt = require("jsonwebtoken");
const fatchuser = require("../middelware/fatchuser");

//rout1:create a user
router.post(
  "/create",
  [
    body("name",'Enter a valid name').isLength({ min: 3 }),
    body("email",'Enter a valid email id').isEmail(),
    body("password",'password at-least 5 charactors').isLength({ min: 5 }),
  ],
  async (req, res) => {
    //  if there is error we return bad error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check wether the email exist alrady
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "This email is alrady exist, plese enter another email ",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secret);

      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interanl server error");
    }
  }
);
//rout2:  user login by, /login
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "password is require").exists(),
  ],
  async (req, res) => {
    //check the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // match the user email and pass word
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      let success=false;
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "please try with correct credentials " });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secret);
      // generate the auth token
      success=true;
      return res.send({ success ,authtoken });
    } catch (error) {
      //if internal error is availble we throw an error
      console.error(error.message);
      return res.status(500).send("Interanl server error");
    }
  }
);

// rout 3: get loggedin user details using: post "/api/auth/getuser", log in require

router.post("/getuser", fatchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
