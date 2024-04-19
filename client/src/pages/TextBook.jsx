import React from 'react'
import Header from '../components/header'

export default function TextBook() {
  return (
    <>
    <Header />
    <div class="container">
        <h1>Textbook Search and Purchase</h1>
        <div class="search-form">
            <input type="text" id="searchInput" placeholder="Search by title, author, or ISBN" />
            <button onclick="search()">Search</button>
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
        
        input[type="text"] {
            padding: 10px;
            width: 60%;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
        }
        
        .search-results {
            margin-top: 20px;
        }
        
        .result {
            padding: 10px;
            border-bottom: 1px solid #ccc;
        }
        
        .result:last-child {
            border-bottom: none;
        }
        `}
    </style>
    </>
  )
}
