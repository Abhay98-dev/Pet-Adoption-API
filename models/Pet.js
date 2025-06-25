const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;

