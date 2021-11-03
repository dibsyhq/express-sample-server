/* --- Please read the README.md file to learn about API Payment Requests --- */

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

const DIBSY_SECRET_API_KEY = process.env.DIBSY_SECRET_API_KEY;
const PORT = process.env.PORT || 4545;
const DIBSY_API_ENDPOINT = process.env.DIBSY_API_ENDPOINT;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.use(express.static("."));
app.use(express.json());
app.use(cors());

app.options("*", cors());


const paymentObject = {
  description: "iPhone 13 - Limited Gold Edition",
  amount: 1000,
  metadata: {
    product_id: 156,
    customer_id: 345,
  },
  customer: {
    name: "Erlich Bachman",
    email: "erlich.bachman@gmail.com",
    phone: "+97433333333",
  },
  redirectUrl: "https://example.com/order",
  webhookUrl: WEBHOOK_URL,
};


/* ----------------- The payment token enables you to submit ---------------- */
/* -------------- the payment if you are using Dibsy Components ------------- */


app.post("/payment-token", async (req, res) => {
  try {
    const payment_response = await axios.post(
      `${DIBSY_API_ENDPOINT}/payments`,
      paymentObject,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DIBSY_SECRET_API_KEY}`,
        },
      }
    );

    res.send(payment_response.data.paymentToken);
  } catch (error) {
    res.status(400);
    res.send({
      message: "There was an error while trying to create payment",
    });
  }
});

/* ------------ NAPS is a hosted checkout for NAPS branded cards ------------ */

app.post("/naps-checkout-link", async (req, res) => {
  paymentObject["method"] = "debitcard";

  try {
    const payment_response = await axios.post(
      `${DIBSY_API_ENDPOINT}/payments`,
      paymentObject,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${DIBSY_SECRET_API_KEY}`,
        },
      }
    );

    res.send(payment_response.data._links.checkout.href);
  } catch (error) {
    res.status(400);
    res.send({
      message: "There was an error while trying to create payment",
    });
  }
});

/* ----------------- Send your customer to a Hosted Dibsy Checkout ----------------- */


app.post("/hosted-checkout-link", async (req, res) => {
  try {
    const payment_response = await axios.post(
      `${DIBSY_API_ENDPOINT}/payments`,
      paymentObject,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DIBSY_SECRET_API_KEY}`,
        },
      }
    );

    res.send(payment_response.data._links.checkout.href);
  } catch (error) {
    res.status(400);
    res.send({
      message: "There was an error while trying to create payment",
    });
  }
});

// Start your server
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
