const mongoose = require("mongoose");
paymentSchema = new mongoose.Schema({
  razorpay_payment_id: { type: String, require: true },
  razorpay_order_id: { type: String, require: true },
  razorpay_signature: { type: String, require: true },
});
module.exports = mongoose.model("paymentSchema", paymentSchema);