import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../images/hamburgerIcon.png';
import '../css/NavBar.css';
import 'animate.css'

export default function NavBar() {
    const navigate = useNavigate();
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
                    <a className='animate__animated animate__bounceIn' href='/settings'>Settings</a>
                    <a className='animate__animated animate__bounceIn' href='/recipes'>Recipes</a>
                    <a className='animate__animated animate__bounceIn' href='/' onClick={handleLogout}>Logout</a>
                </>
            )}
        </nav>
    ); //end return 
} //end NavBar function