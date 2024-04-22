import React, {useState} from 'react'
import Header from '../components/header'
import { useNavigate } from 'react-router-dom';

export default function TextBook() {
  const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const search = () => {
        fetch(`http://localhost:1337/api/book/search/${query}`, {
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
                setBooks(result)
                } else {
                console.log('result not ok', result)
                alert('This Book is not available');
                } 
              }).catch(err => {
                console.log('err', err);
                alert('Something went wrong! try again after refresh');
              })
    }

    const buyBook = (item) => {
        console.log('item', item)
        navigate(`/card/${item?._id}`)
    }
  return (
    <>
    <Header />
    <div class="container">
        <h1>Textbook Search and Purchase</h1>
        <div class="search-form">
            <input type="text" id="searchInput" placeholder="Search by title, author, or ISBN" value={query} onChange={(e) => {setQuery(e?.target?.value)}} />
            <button onClick={() => search()} >Search</button>
        </div>
        {books && books?.length >0
          && <table class="result-table" style={{margin: '0px auto'}}>
            <tr><th>Title</th><th>Author</th><th>Library Location</th><th>Bookstore Name</th><th>Price</th><th></th></tr>
            {books && books?.map(item => (<tr>
              <td>{item?.title}</td>
              <td>{item?.author}</td>
              <td>{item?.availability ? item?.libraryLocation : 'N/A'}</td>
              <td>{item?.availability ? '' : item?.bookstoreName}</td>
              <td>{item?.price}</td>
              <td><button onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                let answer = confirm("Do you want buy this book");
                if(answer){
                    buyBook(item)
                }
              }}>Buy</button></td>
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
