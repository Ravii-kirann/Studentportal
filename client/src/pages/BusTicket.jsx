import React, {useState, useEffect} from 'react'
import Header from '../components/header'
import { useNavigate } from 'react-router-dom';
export default function BusTicket() {
    const navigate = useNavigate (); 
    const [busTicketNumber, setBusTicketNumber] = useState(0);
    const [totalBusTicketNumber, setTotalBusTicketNumber] = useState(0);
    const [zoneTickets, setZoneTickets] = useState({zone1: '0', zone2: '0', zone3: '0'});
    const [totalZoneTickets, setTotalZoneTickets] = useState({zone1: '0', zone2: '0', zone3: '0'})

    useEffect(() => {
       let tempZoneTickets = localStorage.getItem('zoneTickets');
       if(!tempZoneTickets) {
        localStorage.setItem('zoneTickets', JSON.stringify({zone1: '0', zone2: '0', zone3: '0'}))
       } else {
        setTotalZoneTickets(JSON.parse(tempZoneTickets))
       }
       let tempBusPass = localStorage.getItem('busPass');
       if(!tempBusPass){
        localStorage.setItem('busPass', JSON.stringify(0))
       } else {
        setTotalBusTicketNumber(JSON.parse(tempBusPass));
       }
    },[])

    const purchaseZoneTickets = () => {
    fetch('http://localhost:1337/api/busTicket/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('cookie')}`
        },
        body:JSON.stringify({
            zones: ["Zone-1", "Zone-2", "Zone-3"],
            quantity: Number(zoneTickets?.zone1) + Number(zoneTickets?.zone2) + Number(zoneTickets?.zone3)
        })
        }).then(data => {
            let result;
            console.log('data', data)
            result = data.json();
            return result
            }).then(result => {
            console.log('result', result)
            localStorage.setItem('zoneTickets', JSON.stringify({zone1 : Number(totalZoneTickets?.zone1) + Number(zoneTickets?.zone1),
                zone2: Number(totalZoneTickets?.zone2) + Number(zoneTickets?.zone2), zone3: Number(totalZoneTickets?.zone3) + Number(zoneTickets?.zone3) }))
            setTotalZoneTickets(prev => ({zone1 : Number(prev?.zone1) + Number(zoneTickets?.zone1),
            zone2: Number(prev?.zone2) + Number(zoneTickets?.zone2), zone3: Number(prev?.zone3) + Number(zoneTickets?.zone3) }));
            setZoneTickets({zone1: '0', zone2: '0', zone3: '0'});
            navigate(`/BusPaymentForm/${totalZoneTickets}`)
            }).catch(err => {
            console.log('err', err);
            alert('Something went wrong! try again after refresh');
            })
    
    };
    const purchaseBusTicket = () => {
    fetch('http://localhost:1337/api/busTicket/bus-cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('cookie')}`
        },
        body:JSON.stringify({
            quantity: busTicketNumber
        })
        }).then(data => {
            let result;
            console.log('data', data)
            result = data.json();
            return result
            }).then(result => {
            console.log('result', result)
            localStorage.setItem('busPass', JSON.stringify(Number(totalBusTicketNumber) + Number(busTicketNumber)))
            setTotalBusTicketNumber(prev => (Number(prev) + Number(busTicketNumber)));
            setBusTicketNumber(0);
            navigate(`/BusPaymentForm/${busTicketNumber}`)
            }).catch(err => {
            console.log('err', err);
            alert('Something went wrong! try again after refresh');
            })
    }
    
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
            <button onClick={() => {purchaseZoneTickets()}}>Purchase Tickets</button>
            <hr />
            <div class="bus-cards">
                <h2>Bus Card</h2>
                <p>$40 each</p>
                <input type="number" id="busCards" min="0" value={busTicketNumber} onChange={(e) => {setBusTicketNumber(e?.target?.value)}}/>
            </div>
            <button onClick={() => {purchaseBusTicket()}}>Purchase Bus Cards</button>
            <table class="result-table" style={{margin: '0px auto'}}>
                <tr><th>No of zone 1 tickets</th><th>No of zone 2 tickets</th><th>No of zone 3 tickets</th><th>No of Bus passes</th></tr>
                <tr><td>{totalZoneTickets?.zone1}</td><td>{totalZoneTickets?.zone2}</td><td>{totalZoneTickets?.zone3}</td><td>{totalBusTicketNumber}</td></tr>
            </table>
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
        }
        td {
            width: fit-content;
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
