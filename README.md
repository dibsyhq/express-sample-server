# Dibsy Sample Server

Documentation: [https://docs.dibsy.one](https://docs.dibsy.one)

Example of a backend server, that uses the Express framework. There are 3 endpoints that the example serves. 

**/payment-token**

The endpoint serves a `paymentToken`. The token is required to submit the payment if you are using Dibsy Component.

**/naps-checkout-link**

NAPS is a hosted checkout for NAPS branded cards. The endpoint responds with the link to redirect your customer. 

**/hosted-checkout-link**

If you wish to skip creating your own checkout and send your customer to Dibsy Hosted Checkout.