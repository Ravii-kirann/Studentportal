import React from 'react'
import Header from '../components/header'

export default function BusTicket() {
  return (
    <>
    <Header />
        <div class="container">
        <h1>Bus Ticket Purchase</h1>
        <div class="tickets">
            <div class="ticket">
                <h2>Zone 1</h2>
                <p>$2 per ticket</p>
                <input type="number" id="zone1" min="0" max="10" value="0" />
            </div>
            <div class="ticket">
                <h2>Zone 2</h2>
                <p>$4 per ticket</p>
                <input type="number" id="zone2" min="0" max="10" value="0" />
            </div>
            <div class="ticket">
                <h2>Zone 3</h2>
                <p>$6 per ticket</p>
                <input type="number" id="zone3" min="0" max="10" value="0" />
            </div>
        </div>
        <button onclick="purchaseTickets()">Purchase Tickets</button>
        <hr />
        <div class="bus-cards">
            <h2>Bus Card</h2>
            <p>$40 each</p>
            <input type="number" id="busCards" min="0" max="5" value="0" />
        </div>
        <button onclick="purchaseBusCards()">Purchase Bus Cards</button>
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
            margin: 0 auto;
        }
        
        input {
            width: 50px;
            text-align: center;
        }`}
    </style>
    </>
  )
}
