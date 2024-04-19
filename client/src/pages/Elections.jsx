import React, {useState} from 'react'
import Header from '../components/header'
import { useNavigate } from 'react-router-dom';

export default function Elections() {
    const [selected, setSelected] = useState('');
    const [winner, setWinner] = useState('')
    const users = ['John', 'Mary', 'Susan']
    let navigate = useNavigate();

    const handleChange = (e) => {
        console.log('e', e.target.value, e.target.checked)
        if (e.target.checked) {
            setSelected(`${e.target.value}`)
        }
    };
    const handleVoteSubmit = () => {
        fetch('http://localhost:1337/api/vote/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({candidate : selected})
        }).then(data => {
          let result;
          result = data.json();
          console.log('data', data);
          return result
        }).then((result) => {
          console.log('result', result)
          if(result?.message === "Vote recorded successfully") {
            console.log('Register Success')
            setWinner(users[Math.floor(Math.random()*3)])
          } else {
            alert('Something Went wrong! retry after refresh');
          }
        }).catch(err => {
          console.log('err', err);
          alert('Something Went wrong! retry after refresh');
        })
    }

  return (
    <>
        <Header />
        <div class="container">
            <h1>Student Union Election Poll</h1>
            <div class="poll">
                <h2>Vote for the Next Head of Student Union:</h2>
                <div id="pollForm">
                    <label for="candidateJohn">John:</label>
                    <input type="radio" id="candidateJohn" name="candidate" value="John" onChange={(e) => handleChange(e)} />
                    <label for="candidateMary">Mary:</label>
                    <input type="radio" id="candidateMary" name="candidate" value="Mary" onChange={(e) => handleChange(e)} />
                    <label for="candidateSusan">Susan:</label>
                    <input type="radio" id="candidateSusan" name="candidate" value="Susan" onChange={(e) => handleChange(e)} />
                    <button type="submit" onClick={()  => {handleVoteSubmit()}}>Vote</button>
                </div>
            </div>
            <div class="results">
                <h2>Results: {winner ? winner : ''}</h2>
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
