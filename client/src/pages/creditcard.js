import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreditCardForm() {
    const navigate = useNavigate();
    const [cardDetails, setCardDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });
    const [planType, setPlanType] = useState('');

    useEffect(() => {
        const pathParts = window.location.pathname.split("/");
        const pathPlanType = pathParts[pathParts.length - 1];
        setPlanType(pathPlanType);
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:1337/api/mealplan/purchase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("cookie")}`,
                },
                body: JSON.stringify({
                    planType: planType,
                    studentId: localStorage.getItem('userId'),
                }),
            });
            const result = await response.json();
            if (result) {
                alert('Purchase successful');
          
                    navigate('/meals');
                
                
            } else {
                console.log('result not ok', result);
                alert('Something went wrong while buying this meal plan, please try again');
            }
        } catch (error) {
            console.error("Error purchasing meal plan:", error);
            alert("Failed to purchase meal plan. Please try again later.");
        }
    };

    return (
        <>
            <div className="container">
                <h1>Stripe Payment Gateway</h1>
                <div className="payment-form">
                    <h2>Enter Card Details</h2>
                    <div id="paymentForm">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required value={cardDetails.cardNumber} onChange={(e) => { setCardDetails(prev => ({ ...prev, cardNumber: e.target.value })) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationDate">Expiration Date:</label>
                            <input type="text" id="expirationDate" placeholder="MM/YY" required value={cardDetails.expirationDate} onChange={(e) => { setCardDetails(prev => ({ ...prev, expirationDate: e.target.value })) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV:</label>
                            <input type="text" id="cvv" placeholder="123" required value={cardDetails.cvv} onChange={(e) => { setCardDetails(prev => ({ ...prev, cvv: e.target.value })) }} />
                        </div>
                        <button onClick={handleSubmit}>Pay Now</button>
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
