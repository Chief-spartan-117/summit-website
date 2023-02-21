const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nowModel = new Schema({
  image: {
    type: String,
    required: true,
  },
  imageTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("nowadays", nowModel);
