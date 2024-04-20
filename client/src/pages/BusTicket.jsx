import React, {useState} from 'react'
import Header from '../components/header'

export default function BusTicket() {
    const [busTicketNumber, setBusTicketNumber] = useState(0);

    const [zoneTickets, setZoneTickets] = useState({zone1: '0', zone2: '0', zone3: '0'})

    const purchaseBusTicket = () => {
        fetch(`http://localhost:1337/api/busTicket/bus-cards`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity: busTicketNumber})
            }).then(data => {
                let result;
                console.log('data', data);
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
    };
    
  return (
    <>
    <Header />
        <div class="container">
        <h1>Bus Ticket Purchase</h1>
        <div class="tickets">
            <div class="ticket">
                <h2>Zone 1</h2>
                <p>$2 per ticket</p>    
                <input type="number" id="zone1" min="0" value={zoneTickets?.zone1} onChange={(e) => {setZoneTickets(prev => ({...prev, zone1: e.target?.value}))}}/>
            </div>
            <div class="ticket">
                <h2>Zone 2</h2>
                <p>$4 per ticket</p>
                <input type="number" id="zone2" min="0" value={zoneTickets?.zone2} onChange={(e) => {setZoneTickets(prev => ({...prev, zone2: e.target?.value}))}}/>
            </div>
            <div class="ticket">
                <h2>Zone 3</h2>
                <p>$6 per ticket</p>
                <input type="number" id="zone3" min="0" value={zoneTickets?.zone3} onChange={(e) => {setZoneTickets(prev => ({...prev, zone3: e.target?.value}))}}/>
            </div>
        </div>
        <button onclick="purchaseTickets()">Purchase Tickets</button>
        <hr />
        <div class="bus-cards">
            <h2>Bus Card</h2>
            <p>$40 each</p>
            <input type="number" id="busCards" min="0" value={busTicketNumber} onChange={(e) => {setBusTicketNumber(e?.target?.value)}}/>
        </div>
        <button onClick={() => {purchaseBusTicket()}}>Purchase Bus Cards</button>
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
        
        .tickets {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .ticket {
            width: calc(33.33% - 20px);
            padding: 20px;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        .bus-cards {
            text-align: center;
        }
        
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: #fff;
            cursor: pointer;
            display: block;
            margin: 1rem auto;
        }
        
        input {
            width: 50px;
            text-align: center;
        }`}
    </style>
    </>
  )
}
