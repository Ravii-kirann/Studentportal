import React, { useState } from 'react';
import styles from '../styles/login.module.css'
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e?.target?.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:3000/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const data = await response.json();
      // if(data.user){
      //   alert('Login Successful');
      //   window.location.href = '/dashboard'
      // }else{
      //   alert('Please check your username and Password')
      // }
      // console.log('Login successful:', data);
      fetch('http://localhost:1337/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(data => {
        console.log('data', JSON.parse(data))
        navigate('/login')
      })
    } catch (error) {
      console.error('Error during login:', error);
      
    }
  };

  return (<>
  <Header />
    <div className={styles.container}>
        <h2 className={styles.h2}>Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.lable} for="loginName">Login Name:</label>
                <input className={styles.input} type="text" id="loginName" name="loginName" required  value={formData.email} onChange={(e)=>handleChange(e, 'email')}/>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.lable} for="password">Password:</label>
                <input className={styles.input} type="password" id="password" name="password" required value={formData.password} onChange={(e)=>handleChange(e, 'password')}/>
            </div>
            <button className={styles.button} type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
    </>);
};

export default Login;
