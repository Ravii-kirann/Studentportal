import React, { useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

const AuthComponent = ({child}) =>  {
    const navigate = useNavigate();
    useEffect(() =>{
        const userToken = localStorage.getItem('token');
        const userID= localStorage.getItem('userId')
        if(!userID) {
            navigate('/login')
        }
    }, [])

    return(
        <>
            {child}
        </>
    )
}

export default AuthComponent;