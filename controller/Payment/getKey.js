const getKey = (req, res) => {

    res.status(200).json({ razorpay_key: process.env.RAZORPAT_KEY });
  };
  module.exports = getKey;