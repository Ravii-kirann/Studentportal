import React, { useState } from 'react'
import Header from '../components/header'

export default function Roomates() {
        const [details, setDetails] = useState({gender: 'male', approxPrice: 0, moveInDate: ''});
        const [roomMates, setRoomMates] = useState([]);

        const searchRoommate = () => {
            fetch(`http://localhost:1337/api/findMyroom/search?gender=${details?.gender}&moveInDate=${details?.moveInDate}&approxPrice=${details?.approxPrice}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('cookie')}`
                },
              }).then(data => {
                let result;
                    console.log('data', data)
                    result = data.json();
                    return result
                }).then(result => {
                  console.log('result', result)
                  if (result?.length > 0) {
                    setRoomMates(result)
                  } else {
                  console.log('result not ok', result)
                  alert('No one is avaliable at these dates and prices');
                  } 
                }).catch(err => {
                  console.log('err', err);
                  alert('Something went wrong! try again after refresh');
                })
        }
  return (
    <>
    <Header />
    <div class="container">
        <h1>Find Roommate</h1>
        <div class="search-form">
            <label for="moveInDate">Move-in Date:</label>
            <input type="date" id="moveInDate" value={details?.moveInDate} onChange={(e) => {setDetails(prev => ({ ...prev, moveInDate:e.target?.value}))}}/>
            <label for="gender">Gender:</label>
            <select id="gender" value={details?.gender} onChange={(e) => {setDetails(prev => ({ ...prev, gender:e.target?.value}))}}>
                <option key={'1'} value="male">Male</option>
                <option key={'2'} value="female">Female</option>
            </select>
            <label for="price">Approximate Price:</label>
            <input type="number" id="price" placeholder="Enter price" value={details?.approxPrice} min="0" onChange={(e) => {setDetails(prev => ({ ...prev, approxPrice:e.target?.value}))}} />
            <button onClick={() => {searchRoommate()}}>Search</button>
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
