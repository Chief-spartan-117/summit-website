const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const indexController = require("../controller/indexController");

router.get("/", indexController.getIndex);
router.post(
  "/login",
  [
    body("email", "Please provide a valid email").isEmail(),
    body("password", "Please provide valid password").isLength({ min: 5 }),
  ],
  indexController.postLogin
);

router.post(
  "/contact-me",
  [
    body("fname", "Please provide your First Name").trim().isLength({ min: 2 }),
    body("mname", "Please provide a valid Middle Name").trim(),
    body("lname", "Please provide your Last Name").trim(),
    body("gender").trim(),
    body("useremail", "Please Provide a valid Email").trim().isEmail(),
    body("phonenumber", "Please provide a valid phonenumber")
      .trim()
      .isNumeric()
      .isLength({ max: 10 }),
    body("message", "Please provide a message").trim(),
  ],
  indexController.postContact
);

module.exports = router;
