import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../images/hamburgerIcon.png';
import '../css/NavBar.css';
import 'animate.css'

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const userID = urlParams.get('userID');

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');

        navigate('/', { state: { logoutMessage: "Logged out successfully" } });
        alert('Successfully logged out.')
    }
    
    return(
        <nav className={hamburgerOpen ? 'hamburgerOpen ' : ''}>
            <button onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                {/* Here we can add an icon for our hamburger menu */}
                <img className='resize' src={logo} alt='Logo' />
            </button>

            {/* We'll conditionally render our links by hamburgerOpen */}
            { hamburgerOpen && (
                <>
                    <a classname='animate__animated animate__bounceIn' href={`/dashboard?userID=${userID}`}>Dashboard</a>
                    <a className='animate__animated animate__bounceIn' href={`/settings?userID=${userID}`}>Settings</a>
                    <a className='animate__animated animate__bounceIn' href={`/recipes?userID=${userID}`} >Recipes</a>
                    <a className='animate__animated animate__bounceIn' href={`/favorites?userID=${userID}`}>Favorites</a>
                    <a className='animate__animated animate__bounceIn' href='/' onClick={handleLogout}>Logout</a>
                </>
            )}
        </nav>
    ); //end return 
} //end NavBar function