import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import UserIcon from '../user3.png'
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const handleLogout = () => {
        fetch('http://localhost:1337/api/auth/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(data => {
            let result;
            console.log('data', data)
            result = data.json();
            return result
          }).then(result => {
            console.log('result', result)
            if (result === 'Signout success!') {
                navigate('/login');
                localStorage.setItem('userId', '');
                localStorage.setItem('userDetails', '{}');
            } else {
            console.log('result not ok', result)
            alert('Something went wrong try again after refresh');
            } 
          }).catch(err => {
            console.log('err', err);
            alert('Something went wrong try again after refresh');
          })
    };
  return (
    <div style={{display: 'flex', width: '90%', margin:'1rem 5%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={'/'} style={{ textDecoration: 'none'}}>
            <h1 style={{color: 'black', fontWeight: '600', fontSize: '3rem', textDecoration: 'none', lineHeight: '0' }}>S L</h1>
        </Link>
        <div style={{ position: 'relative' }}>
            <div onClick={() => setView(prev => !prev)}>
                <img src={UserIcon} alt='auth icon' style={{ width: '3rem', height: '3rem'}} />
            </div>
                {view &&<>
                    <ul className="dropdown-menu" style={{position:"absolute",top:"100%",left:"-40px",width: '10rem', backgroundColor:"#ffffff",border:"1px solid #cccccc",padding:"8px",listStyleType:"none"}}>
                        <li style={{cursor: 'pointer' }} key={1} onClick={() => navigate('/updateInfo')}>{'Update Info'}</li>
                        <li style={{cursor: 'pointer' }} key={3} onClick={() => handleLogout()}>{'Logout'}</li>
                    </ul>
                </>}
        </div>
        <style>{`
           ul{
            width : 8rem
           }
           li{
            padding : 5px 0
           }
          

        `}</style>
    </div>
  )
}
