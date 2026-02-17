const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  passport: String,
  gender: String,
  address: String,
  state: String,
  zip: String,
  country: String,
  bank_name: String,
  account_holder: String,
  account_number: String,
  ifsc: String,
  branch: String,
  cheque: String,
  passport_front: String,
  passport_back: String,
  national_id: String,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
