import React, { useEffect, useState } from 'react';
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
  const [isReg, setIsReg] = useState(true);
  const [userID, setUserId] = useState('')
  useEffect(() => {
    if (window.location.pathname === '/updateInfo') {
      setIsReg(false);
      let temp = JSON.parse(localStorage.getItem('userDetails'));
      setUserId(temp?._id)
      const {firstName, lastName, address, city, state, zipCode, email, loginName} = temp;
      setFormData({firstName, lastName, address, city, state, zipCode, email, loginName})
    } else {
      setIsReg(true);
    }
  },[])

  const handleChange = (e,name) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [name]: e?.target?.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReg) {
      if (formData?.password !== formData?.confirmPassword) {
        return alert('Please enter the password and confirm password same')
      }
        fetch('http://localhost:1337/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }).then(data => {
          let result;
          result = data.json();
          console.log('data', data);
          return result
        }).then((result) => {
          console.log('result', result)
          if(result?.status === 'ok') {
            navigate('/login');
            console.log('Register Success')
          } else {
            alert('Something Went wrong! retry after refresh');
          }
        }).catch(err => {
          console.log('err', err);
          alert('Something Went wrong! retry after refresh');
        })
    } else {
      if (formData?.password && formData?.confirmPassword && formData?.password !== formData?.confirmPassword) {
        return alert('Please enter the password and confirm password same')
      }
      // let userId = JSON.parse(localStorage.getItem('userId')) ?? JSON.parse(localStorage.getItem('userDetails'))?._id
      fetch(`http://localhost:1337/api/user/update/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cookie')}`
        },
        body: JSON.stringify({formData})
      }).then(data => {
        let result;
        result = data.json();
        console.log('data', data);
        return result
      }).then((result) => {
        console.log('result', result)
        if(result) {
          localStorage.setItem('userDetails', JSON.stringify(result))
          navigate('/');
        } else {
          alert('Something Went wrong! retry after refresh');
        }
      }).catch(err => {
        console.log('err', err);
        alert('Something Went wrong! retry after refresh');
      })
    }
  };
  

  return (
  <>
  {!isReg && <Header />}
  <div class="container">
        <h2>Registration</h2>
        <form id="registration-form" onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required={isReg  } value={formData?.firstName} onChange={(e) => handleChange(e, 'firstName')}/>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required={isReg  } value={formData?.lastName} onChange={(e) => handleChange(e, 'lastName')}/>
            </div>
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required={isReg  } value={formData?.address} onChange={(e) => handleChange(e, 'address')}/>
            </div>
            <div class="form-group">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" required={isReg  } value={formData?.city} onChange={(e) => handleChange(e, 'city')}/>
            </div>
            <div class="form-group">
                <label for="state">State:</label>
                <input type="text" id="state" name="state" required={isReg  } value={formData?.state} onChange={(e) => handleChange(e, 'state')}/>
            </div>
            <div class="form-group">
                <label for="zipCode">Zip Code:</label>
                <input type="text" id="zipCode" name="zipCode" required={isReg  } value={formData?.zipCode} onChange={(e) => handleChange(e, 'zipCode')}/>
            </div>
            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required={isReg } value={formData?.email} onChange={(e) => handleChange(e, 'email')}/>
            </div>
            <div class="form-group">
                <label for="loginName">Login Name:</label>
                <input type="text" id="loginName" name="loginName" required={isReg  } value={formData?.loginName} onChange={(e) => handleChange(e, 'loginName')}/>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required={isReg  } value={formData?.password} onChange={(e) => handleChange(e, 'password')}/>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required={isReg  } value={formData?.confirmPassword} onChange={(e) => handleChange(e, 'confirmPassword')}/>
            </div>
            <button type="submit"
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
