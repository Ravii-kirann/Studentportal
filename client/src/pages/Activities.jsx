import React, {useState} from 'react'
import Header from '../components/header'

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [dates, setDates] = useState({startDate: '', endDate: ''});

    const taskChange = (e, names) => {
        console.log('value', e.target.value)
        setDates(prev => ({...prev, [names]: e?.target?.value}))
    };

    const DateFormater = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
        return formattedDate || 'N/A';
    }

    const HandleSubmit = () => {
        fetch(`http://localhost:1337/api/activities/${dates?.startDate}/${dates?.endDate}`, {
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
                if (result && Object.keys(result)?.length > 0) {
                let tempResult = Object.values(result);
                console.log('tempResult', tempResult);
                setActivities(...tempResult)
                } else {
                console.log('result not ok', result)
                alert('There are no activities during between these dates');
                } 
              }).catch(err => {
                console.log('err', err);
                alert('Something went wrong! try again after refresh');
              })
    };


  return (
    <>
    <Header />
    <div class="container">
        <h1>Sports Activities and Parties</h1>
        <div class="filters">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" onChange={(e) => {taskChange(e, 'startDate')}}/>
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" onChange={(e) => {taskChange(e, 'endDate')}}/>
            <button onClick={() => {HandleSubmit()}}>Search</button>
        </div>
        {activities && activities?.length >0
          && <table class="result-table"  style={{margin: '0px auto'}}>
            <tr><th>name</th><th>description</th><th>date</th></tr>
            {activities && activities.length > 0 && (
    <table className="result-table" style={{ margin: '0px auto' }}>
        <thead>
            <tr><th>name</th><th>description</th><th>date</th></tr>
        </thead>
        <tbody>
            {activities.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{DateFormater(item.date)}</td>
                </tr>
            ))}
        </tbody>
    </table>
)}
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
