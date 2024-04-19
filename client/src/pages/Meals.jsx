import React from 'react'
import Header from '../components/header'

export default function Meals() {
  return (
    <>
    <Header />
    <div class="container">
        <h1>Meal Plan Purchase</h1>
        <div class="plans">
            <div class="plan">
                <h2>Monthly Plan</h2>
                <p>$600 per month</p>
                <button onclick="purchaseMealPlan('monthly')">Purchase</button>
            </div>
            <div class="plan">
                <h2>Semester Plan</h2>
                <p>$1140 per semester</p>
                <button onclick="purchaseMealPlan('semester')">Purchase</button>
            </div>
        </div>
    </div>
    <style>
        {`
        .container {
            max-width: 800px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            text-align: center;
        }
        
        .plans {
            display: flex;
            justify-content: center;
        }
        
        .plan {
            width: 250px;
            padding: 20px;
            margin: 20px;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
        }
        `}
    </style>
    </>
  )
}
