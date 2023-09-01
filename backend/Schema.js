const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name : {
    type :String
  },
  description : {
    type :String
  },
  price : {
    type : Number
  },
  image : {
    type: String
  },
});

module.exports = mongoose.model("products", ProductSchema);