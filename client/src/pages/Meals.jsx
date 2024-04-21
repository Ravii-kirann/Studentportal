import React, { useEffect, useState } from 'react'
import Header from '../components/header'

export default function Meals() {
    const [mealPurchased, setMealPurchased] = useState('');
    useEffect(() => {
        let mealPur = JSON.parse(localStorage.getItem('mealPurchased'));
        if(mealPur && mealPur !== 0) {
            setMealPurchased(mealPur)
        } else {
            localStorage.setItem('mealPurchased', JSON.stringify(''))
        }
    },[])
    const purchaseMealPlan = (date) => {
        setMealPurchased(date);
        localStorage.setItem('mealPurchased', JSON.stringify(date))
    }
  return (
    <>
    <Header />
    <div class="container">
        <h1>Meal Plan Purchase</h1>
        <div class="plans">
            <div class="plan">
                <h2>Monthly Plan</h2>
                <p>$600 per month</p>
                <button disabled={mealPurchased!==''} onClick={() => purchaseMealPlan('monthly')}>Purchase</button>
            </div>
            <div class="plan">
                <h2>Semester Plan</h2>
                <p>$3420 per semester (5% discount)</p>
                <button disabled={mealPurchased!==''} onClick={() => purchaseMealPlan('semester')}>Purchase</button>
            </div>
        </div>
        <div>
            {mealPurchased&&<h1>{`${mealPurchased} meal plan has been purchased`}</h1>}
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
