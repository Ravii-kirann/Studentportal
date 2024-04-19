import React from 'react'
import Header from '../components/header'

export default function Roomates() {
  return (
    <>
    <Header />
    <div class="container">
        <h1>Find Roommate</h1>
        <div class="search-form">
            <label for="moveInDate">Move-in Date:</label>
            <input type="date" id="moveInDate" />
            <label for="gender">Gender:</label>
            <select id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label for="price">Approximate Price:</label>
            <input type="number" id="price" placeholder="Enter price" />
            <button onclick="searchRoommate()">Search</button>
        </div>
        <div id="searchResults" class="search-results">
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
                margin-bottom: 20px;
            }
            
            .search-form {
                text-align: center;
                margin-bottom: 20px;
            }
            
            label {
                margin-right: 10px;
            }
            
            input[type="date"],
            input[type="number"],
            select {
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #ccc;
                margin-right: 10px;
            }
            
            button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: #fff;
                cursor: pointer;
                margin-top: 2rem
            }
            
            .search-results {
                margin-top: 20px;
            }
            `}
        </style>
    </>
  )
}
