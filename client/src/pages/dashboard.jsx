import React, { useEffect } from "react";
import styles from '../styles/dashboard.module.css';
import Header from "../components/header";
import { useNavigate  } from 'react-router-dom';
//import jwt from 'jsonwebtoken';
// import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const userId= localStorage.getItem('userId');
        console.log('userId', userId)
        if(!userId) {
            console.log('navigate to login')
            navigate('/login')
        }
    },[navigate])
    

    return (<>
    <Header />
    <div className={styles.container}>
        <h1>Welcome to the Student Dashboard</h1>
        
        <section className={styles.section}>
            <h2  className={styles.sectionH2} >People Searching</h2>
            <p>Find people by department, first name, or last name.</p>
            <button onClick={()=> navigate('/people')} className={styles.btn}>Search People</button>
        </section>
        
        <section className={styles.section}>
            <h2 className={styles.sectionH2} >Textbook Searching and Purchase</h2>
            <p>Search for textbooks by title, author, or ISBN. Purchase textbooks online.</p>
            <button onClick={()=> navigate('/textbooks')} className={styles.btn}>Search Textbooks</button>
        </section>
        
        <section className={styles.section}>
            <h2 className={styles.sectionH2} >Roommate Finding</h2>
            <p className={styles.sectionP} >Find roommates based on move-in date, gender, and price.</p>
            <button onClick={()=> navigate('/roommates')} className={styles.btn}>Find Roommates</button>
        </section>
        
        <section className={styles.section}>
            <h2 className={styles.sectionH2} >Meal Plan</h2>
            <p className={styles.sectionP} >Purchase a meal plan online by month or semester with credit card.</p>
            <button onClick={()=> navigate('/meals')} className={styles.btn}>Purchase Meal Plan</button>
        </section>
        
        <section className={styles.section}>
            <h2 className={styles.sectionH2} >Purchase a Bus Ticket</h2>
            <p className={styles.sectionP} >Buy bus tickets online with credit card. Choose multiple zones and tickets.</p>
            <button onClick={()=> navigate('/bustickets')} className={styles.btn}>Buy Bus Tickets</button>
        </section>
        
        <section className={styles.section}>
            <h2 className={styles.sectionH2} >Sports Activities and Parties</h2>
            <p className={styles.sectionP} >View scheduled sports activities and parties. Select activities to attend.</p>
            <button onClick={()=> navigate('/activities')} className={styles.btn}>View Schedule</button>
        </section>
        
        <section className={styles.section}>
            <h2 className={styles.sectionH2} >Election</h2>
            <p className={styles.sectionP} >Participate in the student union election poll. Choose your candidate.</p>
            <button onClick={()=> navigate('/elections')} className={styles.btn}>Vote Now</button>
        </section>
    </div></>);
};

export default Dashboard;
