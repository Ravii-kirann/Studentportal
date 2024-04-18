import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // Import useHistory hook

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Redirect to login page after successful registration
      navigate('/login');
  
      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
