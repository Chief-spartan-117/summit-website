const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galleryModal = new Schema({
  image: {
    type: String,
    required: true,
  },
  imageTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gallery", galleryModal);
