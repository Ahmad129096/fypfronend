import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSnackbar } from 'notistack';

import { Elements } from "@stripe/react-stripe-js";
import image from '../../assets/bogga.jpg'
const Zapp = () => {
  const stripe = loadStripe(
    "pk_test_51K2xrMClxd6TMvxzpMqTys8rZ4dz3uvY9FpkyEKCVnaxYvUOHpNPoRaBeMdqx4Lt1VWHHXTAOoj7jAoDmlxMhg5E00KJI3u8wW"
  );
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};


export  function CheckoutForm() {
  // 1️⃣ Setup state to track client secret, errors and checkout status
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  // 2️⃣ Store reference to Stripe
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // 3️⃣ Create PaymentIntent and fetch client secret as soon as the page loads
    window.fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    }).then((res) => { 
      return res.json();
    }).then((data) => {
      setClientSecret(data.clientSecret);
    });
  }, []);
  const handleChange = async (event) => {
    // 4️⃣ Listen for changes in the CardElement and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
   // 5️⃣ Confirm Card Payment.
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
// 6️⃣ Construct UI.

  let pay = () =>{
    enqueueSnackbar('Order placed!', {
        variant: 'success',
        autoHideDuration: 2000
      });
      setTimeout(function() {
        window.location.href = '/user';
      }, 2000);
  }
return (
    <div >
    <div style={{margin:'100px auto',width:500,border:'1px solid grey',padding:50}}>
    <form id="payment-form" onSubmit={handleSubmit} >
    
      <CardElement 
        id="card-element"
        onChange={handleChange}
      />
      <button onClick={pay} disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">{error}</div>
      )}
      {/* Show a success message upon completion */}
     
    </form>
    </div>
    </div>
  );
}
export default Zapp;