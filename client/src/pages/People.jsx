import React, { useState } from 'react'
import Header from '../components/header';

export default function People() {
    const [people, setPeople] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch= () =>{
        fetch(`http://localhost:1337/api/person/search/${search}`, {
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
              setPeople(result)
          } else {
          console.log('result not ok', result)
          alert('No student or faculty present in the data base with that query');
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
          {people && people?.length >0
          && <table class="result-table">
            <tr><th>Name</th><th>department</th><th>phone number</th><th>email</th></tr>
            {people && people?.map(item => (<tr>
              <td>{item?.firstName + ' ' + item?.lastName}</td>
              <td>{item?.department}</td>
              <td>{item?.phoneNumber}</td>
              <td>{item?.email}</td>
            </tr>))}
          </table>}
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
            margin-left: 2rem
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
