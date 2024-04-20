import React, { useState } from 'react'
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';

export default function People() {
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch= () =>{
        fetch(`http://localhost:1337/api/person/search/${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(data => {
        let result;
            console.log('data', data)
            result = data.json();
            return result
          }).then(result => {
            console.log('result', result)
            if (result === 'Signout success!') {
               
            } else {
            console.log('result not ok', result)
            alert('Something went wrong! try again after refresh');
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
        <h1>Search for Students or Faculty</h1>
        <div class="search-form">
            <input type="text" id="searchInput" placeholder="Search by department, first name, or last name" value={search} onChange={(e) => {
                setSearch(e.target?.value)
            }} />
            <button  onClick={() => {handleSearch()}}>Search</button>
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
