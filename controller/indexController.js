require("dotenv").config();
const { validationResult } = require("express-validator");
const { validate } = require("deep-email-validator");
const { Filter } = require("profanity-check");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const Contact = require("../models/contactModal");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.getIndex = (req, res, next) => {
  res.render("index");
};

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);

  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!errors.isEmpty()) {
      const error = { message: errors.array()[0].msg };
      error.statusCode = 500;
      throw error;
    }
    const user = await User.findOne({
      email: "admin@summit-shrestha.com.np",
    });
    let loadeduser;
    if (
      !user &&
      email === "admin@summit-shrestha.com.np" &&
      password === "summit@123"
    ) {
      const newuser = new User({
        email: email,
        password: password,
      });

      await newuser.save();
      loadeduser = newuser;
      const token = jwt.sign(
        { id: loadeduser._id.toString() },
        "Mr8Max0000000000",
        { expiresIn: "1h" }
      );

      return res.status(201).redirect("/");
    } else if (
      user &&
      email === "admin@summit-shrestha.com.np" &&
      password === "summit@123"
    ) {
      loadeduser = user;
      const token = jwt.sign(
        { id: loadeduser._id.toString() },
        "Mr8Max0000000000",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: token,
      });
    } else {
      return res.status(401).json({
        message: "User cannot log in",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.postContact = async (req, res, next) => {
  const errors = validationResult(req);
  const filter = new Filter({ languages: ["english", "hindi"] });
  const fname = req.body.fname;
  const mname = req.body.mname;
  const lname = req.body.lname;
  const gender = req.body.gender;
  const email = req.body.useremail;
  const phonenumber = req.body.phonenumber;
  const message = req.body.message;
  try {
    if (!errors.isEmpty()) {
      const error = { message: errors.array()[0].msg };
      error.statusCode = 500;
      throw error;
    }
    const emailValidate = await validate({
      email: email,
      validateDisposable: true,
      validateSMTP: true,
      validateTypo: true,
      validateMx: true,
      validateRegex: true,
    });

    if (emailValidate.valid === false) {
      const errorValidate = {
        message: emailValidate.reason,
      };
      errorValidate.statusCode = 500;
      throw errorValidate;
    }

    if (
      filter.isProfane(fname) ||
      filter.isProfane(mname) ||
      filter.isProfane(lname) ||
      filter.isProfane(email) ||
      filter.isProfane(phonenumber) ||
      filter.isProfane(message)
    ) {
      const filterError = { message: "Use proper words" };
      filterError.statusCode = 500;
      throw filterError;
    }

    const contact = new Contact({
      fname: fname,
      mname: mname,
      lname: lname,
      gender: gender,
      email: email,
      phoneNumber: phonenumber,
      message: message,
    });

    transport.sendMail({
      to: email,
      from: "contact@summit-shrestha.com.np",
      subject: "Contact",
      html: `Hi ${fname}, I am glad to get your message I will reply you as soon as possible`,
    });

    await contact.save();

    res.status(201).json({
      message: "Message Successfully Sent",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
