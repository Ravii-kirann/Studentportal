import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const submit = () => {
    fetch(`http://localhost:1337/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        email
      })
      }).then(data => {
          let result;
          console.log('data', data)
          result = data.json();
          return result
        }).then(result => {
          console.log('result', result)
          localStorage.setItem('resetPasswordLink', result?.link);
          if (result?.link) {
            navigate('/resetPassword')
          } else {
          console.log('result not ok', result)
          alert('There is no account with this email');
          } 
        }).catch(err => {
          console.log('err', err);
          alert('Something went wrong! try again after refresh');
        })
  };
  return (
    <div class="body">
    {/* <Header /> */}
    <div class="container">
        <h2>Forgot Password</h2>
        <div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target?.value)}} />
            </div>
            <div class="form-group">
                <button onClick={() => {submit()}}>Submit</button>
            </div>
        </div>
    </div>
    <style>{`
    .body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 300px;
  }
  
  .container h2 {
      margin-top: 0;
      text-align: center;
  }
  
  .form-group {
      margin-bottom: 20px;
  }
  
  .form-group label {
      display: block;
      margin-bottom: 5px;
  }
  
  .form-group input {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
  }
  
  .form-group button {
      width: 100%;
      padding: 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
  }
  
  .form-group button:hover {
      background-color: #0056b3;
  }
    `}</style>
    </div>
  )
}
