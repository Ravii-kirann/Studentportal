import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [link, setLink] = useState('');
    useEffect(() => {
        if(localStorage.getItem('resetPasswordLink')) {
            setLink(localStorage.getItem('resetPasswordLink'))
        }
    },[])
    const submit = () => {
        fetch(`${link}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                password, confirmPassword: confirmPass
            })
          }).then(data => {
            let result;
            console.log('data', data)
            result = data.json();
            return result
          }).then(result => {
            console.log('result', result)
            if (result?.result) {
                navigate('/login');
            } else {
            console.log('result not ok', result)
            alert('Something went wrong try again after refresh');
            } 
          }).catch(err => {
            console.log('err', err);
            alert('Something went wrong try again after refresh');
          })
    }
  return (
    <div class="body">
    <div class="container">
        <h2>Reset Password</h2>
        <div>
            <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" id="password" name="password" placeholder="Enter new password" value={password} onChange={(e) => {setPassword(e.target?.value)}} />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" value={confirmPass} onChange={(e) => {setConfirmPass(e.target?.value)}}/>
            </div>
            <div class="form-group">
                <button onClick={() => submit()}>Reset Password</button>
            </div>
        </div>
    </div>
    <style>
        {`
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
            font-weight: bold;
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
        `}
    </style>
    </div>
  )
}
