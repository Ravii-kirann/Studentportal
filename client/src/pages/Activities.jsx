import React from 'react'
import Header from '../components/header'

export default function Activities() {
  return (
    <>
    <Header />
    <div class="container">
        <h1>Sports Activities and Parties</h1>
        <div class="filters">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" />
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" />
            <button onclick="searchActivities()">Search</button>
        </div>
        <div class="activities">
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
        
        .filters {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .filters label {
            margin-right: 10px;
        }
        
        .filters input {
            margin-right: 20px;
        }
        
        .activities {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-gap: 20px;
        }
        
        .activity {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 8px;
        }
        
        .activity h2 {
            margin-top: 0;
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
