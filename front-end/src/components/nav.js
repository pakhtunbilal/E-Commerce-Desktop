import React from 'react';

import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('users');

    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
         <img className='doomslayer' src={process.env.PUBLIC_URL + '/doomslayer.jpg'} alt="logo"  />
             { auth ?
            <ul className='nav-ul'>
                <li> <Link to={'/'}>home page </Link></li>
                <li> <Link to={'/add'}>Add product </Link></li>
                <li> <Link to={'/update'}>Update product </Link></li>
                <li> </li>
                <li> <Link to={'/profile'}>Profile </Link></li>
                <li><Link onClick={logout} to={'/signup'}>Logout ({JSON.parse(auth).name})</Link></li>
                
            </ul>
            :
            <ul className='nav-ul move-right' >
                <li><Link to={'/signup'}>Sign Up </Link></li>
                         <li><Link to={'/login'}>login </Link></li>
            </ul>
}
        </div>
    )
}

export default Nav;