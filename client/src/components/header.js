import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import UserIcon from '../user3.png'
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const handleLogout = () => {
        alert('logout bruh')
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
                        <li style={{cursor: 'pointer' }} key={1} onClick={() => navigate('/register')}>{'Update Info'}</li>
                        <li style={{cursor: 'pointer' }} key={2} onClick={() => navigate('changePassword')}>{'Change Password'}</li>
                        <li style={{cursor: 'pointer' }} key={3} onClick={() => handleLogout()}>{'Logout'}</li>
                    </ul>
                </>}
        </div>
    </div>
  )
}
