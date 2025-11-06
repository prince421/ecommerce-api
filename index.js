import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Replace with your own Razorpay credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_RWiBacuW2Kvowz",
  key_secret: "G6NGMlGIHoVy5Xyh4e4lNUXQ",
});

app.post("/create-order", async (req, res) => {

  console.log("req.body" , req.body);
  
  try {
    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };
    const order = await razorpay.orders.create(options);
    console.log("order" , order);
    
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => console.log("✅ Razorpay backend running on port 5000"));
