const crypto = require("crypto");
const paymentSchema = require("../../model/paymentSchema");
const paymentVerification = async (req, res) => {
  try {
    if (req.body) {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;
console.log("req body",req.body);
        // genrating the sinnature by using  payment _id and order_id

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      var expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAT_SECRET)
        .update(body.toString())
        .digest("hex");
      console.log("sig received", razorpay_signature);
      console.log("sig generated", expectedSignature);

      //checking the genrated signature and resived signature

      if (razorpay_signature === expectedSignature) {
        const paymentDetaits = await new paymentSchema({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        });

        //storing the payment details
        
        if (paymentDetaits) {
          paymentDetaits.save();
          redirect("http://localhost:3000/");
          res.status(200).send("payment details stored")
        } else {
          res.status(400).json({
            status: "failed",
            message: " issue  in storing payment detaits ",
          }); 
        }
      } else {
        res.status(401).json({ status: "failed", message: "Unauthorized" });
      }
    } else {
      res.status(400).json({ status: "failed", message: "invalid credential" });
    }
  } catch (er) {
    res.status(400).json({ message: er.message });
  }
};
module.exports = paymentVerification;