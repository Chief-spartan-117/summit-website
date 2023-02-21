const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactModal = new Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
  },
  lname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactModal);
