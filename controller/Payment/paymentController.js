const Razorpay = require("razorpay");
const checkout = async (req, res) => {
  console.log(req.body);
  try {
    // creating the Razorpay  instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAT_KEY,
      key_secret: process.env.RAZORPAT_SECRET,
    });
// cofigaring the payment options
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    //creating the order
    const order = await instance.orders.create(options); 
    console.log(order);
    order
      ? res.status(200).json({
          success: true,
          order,
        })
      : res
          .status(400)
          .json({ status: "failed", message: "order not created" });
  } catch (er) {
    res.status(500).json({ message: "failed to order" });
  }
};
module.exports = checkout;