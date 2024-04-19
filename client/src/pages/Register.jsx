import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // Import useHistory hook
import Header from '../components/header';
function Register() {
  const navigate = useNavigate (); // Initialize history object
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    loginName: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e,name) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [name]: e?.target?.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:1337/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // });
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // Redirect to login page after successful registration
      fetch('http://localhost:1337/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(data => {
        console.log('data', JSON.parse(data))
        navigate('/login');
      }).catch(err => {
        console.error('Error during registration:', err);
      })
  
      // const data = await response.json();
      // console.log('Registration successful:', data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
  <>
  <Header />
  <div class="container">
        <h2>Registration</h2>
        <form id="registration-form" onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required value={formData?.firstName} onChange={(e) => handleChange(e, 'firstName')}/>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required value={formData?.lastName} onChange={(e) => handleChange(e, 'lastName')}/>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required value={formData?.address} onChange={(e) => handleChange(e, 'address')}/>
            </div>
            <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" required value={formData?.city} onChange={(e) => handleChange(e, 'city')}/>
            </div>
            <div class="form-group">
                <label for="state">State:</label>
                <input type="text" id="state" name="state" required value={formData?.state} onChange={(e) => handleChange(e, 'state')}/>
            </div>
            <div class="form-group">
                <label for="zipCode">Zip Code:</label>
                <input type="text" id="zipCode" name="zipCode" required value={formData?.zipCode} onChange={(e) => handleChange(e, 'zipCode')}/>
            </div>
            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required value={formData?.email} onChange={(e) => handleChange(e, 'email')}/>
            </div>
            <div class="form-group">
                <label for="loginName">Login Name:</label>
                <input type="text" id="loginName" name="loginName" required value={formData?.loginName} onChange={(e) => handleChange(e, 'loginName')}/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required value={formData?.password} onChange={(e) => handleChange(e, 'password')}/>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required value={formData?.confirmPassword} onChange={(e) => handleChange(e, 'confirmPassword')}/>
            </div>
            <button type="submit"
            // onClick={() => {handleSubmit()}}
            >Register</button>
        </form>
    </div>
    <style>
    {`
    .container {
        max-width: 400px;
        margin: 100px auto;
        margin-top: 0px;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        font-weight: bold;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
        width: 90%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        width: 95%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
`}
</style>
    </>
  );
}

export default Register;
