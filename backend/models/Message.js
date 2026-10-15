const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, maxlength: 160 },
    subject: { type: String, trim: true, maxlength: 200, default: "New portfolio message" },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    ip: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
