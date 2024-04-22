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
    const DateFormater = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
        console.log('dateString', dateString, 'formattedDate', formattedDate)
        return formattedDate || 'N/A';
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
        {roomMates && roomMates?.length >0
          && <table class="result-table" style={{margin: '0px auto'}}>
            <tr><th>name</th><th>gender</th><th>moveInDate</th><th>priceRange</th></tr>
            {roomMates && roomMates?.map((item, index) => (<tr key={index}>
                {console.log(item)}
              <td>{item?.name}</td>
              <td>{item?.gender}</td>
              <td>{item?.priceRange?.min + '-' + item?.priceRange?.max}</td>
              <td>{DateFormater(item?.moveInDate)}</td>
            </tr>))}
          </table>}
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
            .result:last-child {
                border-bottom: none;
            }
                .result-table th, .result-table td {
                padding: 10px;
                border: 1px solid #ddd;
                text-align: left;
            }
            
            .result-table th {
                background-color: #f2f2f2;
            }
            `}
        </style>
    </>
  )
}
