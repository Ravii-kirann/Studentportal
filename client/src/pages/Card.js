import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card() {
    const navigate = useNavigate();
    const [cardDetails, setCardDetails] = useState({cardNumber:'', expirationDate: '', cvv:''});
    const [id, setId] = useState('');
    useEffect(() => {
        setId(window.location.pathname.split("/")?.[2])
    },[])
    const handleSubmit = () => {
        let totalBooks = localStorage.getItem('books');
        let tempcart = JSON.parse(localStorage.getItem('cart'));
        if (!totalBooks) {
            localStorage.setItem('books', JSON.stringify([]))
        }
        fetch(`http://localhost:1337/api/book/textbooks/purchase`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('cookie')}`
            },
            body:JSON.stringify({
                UserId: localStorage.getItem('userId'),
                textbookID: id
            })
            }).then(data => {
                let result;
                console.log('data', data)
                result = data.json();
                return result
              }).then(result => {
                console.log('result', result)
                if (result) {
                    localStorage.setItem('books', JSON.stringify([ ...(totalBooks||[]), tempcart]));
                    localStorage.setItem('cart', JSON.stringify({}));
                    alert('Purchase successfull')
                    if(result?.discountApplied) {
                        alert('10% discount is available in the next purchase')
                    }
                    navigate('/textbooks')
                } else {
                console.log('result not ok', result)
                alert('Something went wrong while buying this book, please try again');
                } 
              }).catch(err => {
                console.log('err', err);
                alert('Something went wrong! try again after refresh');
              })
    }
  return (
    <>
        <div class="container">
            <h1>Stripe Payment Gateway</h1>
            <div class="payment-form">
            <h2>Enter Card Details</h2>
            <div id="paymentForm">
                <div class="form-group">
                <label for="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required value={cardDetails?.cardNumber} onChange={(e) => {setCardDetails(prev => ({...prev, cardNumber: e.target?.value}))}}/>
                </div>
                <div class="form-group">
                <label for="expirationDate">Expiration Date:</label>
                <input type="text" id="expirationDate" placeholder="MM/YY" required value={cardDetails?.expirationDate} onChange={(e) => {setCardDetails(prev => ({...prev, expirationDate: e.target?.value}))}}/>
                </div>
                <div class="form-group">
                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" placeholder="123" required value={cardDetails?.cvv} onChange={(e) => {setCardDetails(prev => ({...prev, cvv: e.target?.value}))}}/>
                </div>
                <button onClick={() => handleSubmit()}>Pay Now</button>
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
