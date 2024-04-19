import React from 'react'
import Header from '../components/header'

export default function Elections() {
  return (
    <>
        <Header />
        <div class="container">
            <h1>Student Union Election Poll</h1>
            <div class="poll">
                <h2>Vote for the Next Head of Student Union:</h2>
                <form id="pollForm">
                    <label for="candidateJohn">John:</label>
                    <input type="radio" id="candidateJohn" name="candidate" value="John" />
                    <label for="candidateMary">Mary:</label>
                    <input type="radio" id="candidateMary" name="candidate" value="Mary" />
                    <label for="candidateSusan">Susan:</label>
                    <input type="radio" id="candidateSusan" name="candidate" value="Susan" />
                    <button type="submit">Vote</button>
                </form>
            </div>
            <div class="results">
                <h2>Results:</h2>
                <div id="resultsChart" class="chart">
                </div>
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
            }
            
            .poll {
                margin-bottom: 20px;
            }
            
            .poll h2 {
                margin-top: 0;
            }
            
            .poll label {
                margin-right: 10px;
            }
            
            .poll input {
                margin-right: 20px;
            }
            
            .results h2 {
                margin-top: 0;
            }
            
            .chart {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .bar {
                width: 200px;
                margin-bottom: 10px;
            }
            
            .bar-label {
                margin-bottom: 5px;
            }
            
            .bar-fill {
                background-color: #007bff;
                height: 20px;
                border-radius: 10px;
            }
            
            .button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                background-color: #007bff;
                color: #fff;
                cursor: pointer;
            }
            `}
        </style>
    </>
  )
}
