import React from 'react'

export default function Card() {
  return (
    <>
        <div class="container">
            <h1>Stripe Payment Gateway</h1>
            <div class="payment-form">
            <h2>Enter Card Details</h2>
            <div id="paymentForm">
                <div class="form-group">
                <label for="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>
                <div class="form-group">
                <label for="expirationDate">Expiration Date:</label>
                <input type="text" id="expirationDate" placeholder="MM/YY" required />
                </div>
                <div class="form-group">
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="123" required />
                </div>
                <button type="submit">Pay Now</button>
            </div>
            </div>
        </div>
        <style>
            {`
            .container {
                max-width: 500px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              
              h1 {
                text-align: center;
              }
              
              .payment-form {
                margin-bottom: 20px;
              }
              
              .payment-form h2 {
                margin-top: 0;
              }
              
              .form-group {
                margin-bottom: 15px;
              }
              
              label {
                display: block;
                margin-bottom: 5px;
              }
              
              input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
              
              button {
                display: block;
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: #fff;
                font-size: 16px;
                cursor: pointer;
              }
              
              button:hover {
                background-color: #0056b3;
              }
            `}
        </style>
    </>
  )
}
