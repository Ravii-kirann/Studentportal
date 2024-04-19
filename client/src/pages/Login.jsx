import React, { useState } from 'react';
import styles from '../styles/login.module.css'
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginName: '',
    password: ''
  });

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e?.target?.value });
  };

  const handleSubmit = () => {
      fetch('http://localhost:1337/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(data => {
        let result;
        result = data.json();
        return result
      }).then((result) => {
        console.log('result', result)
        localStorage.setItem('userId', result?._id)
        localStorage.setItem('userDetails', JSON.stringify(result))
        if(result?._id) {
          navigate('/');
          console.log('login Success')
        } else {
          alert('Something Went wrong, Create Acount');
        }
      }).catch(err => {
        console.log('err', err);
        alert('The user is not found! create account');
      })
  };

  return (<>
  <Header />
    <div className={styles.container}>
        <h2 className={styles.h2}>Login</h2>
        <div id="login-form">
            <div className={styles.formGroup}>
                <label className={styles.lable} for="loginName">Login Name:</label>
                <input className={styles.input} type="text" id="loginName" name="loginName" required  value={formData.loginName} onChange={(e)=>handleChange(e, 'loginName')}/>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.lable} for="password">Password:</label>
                <input className={styles.input} type="password" id="password" name="password" required value={formData.password} onChange={(e)=>handleChange(e, 'password')}/>
            </div>
            <button className={styles.button} type="submit" onClick={handleSubmit}>Login</button>
        </div>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
    </>);
};

export default Login;
