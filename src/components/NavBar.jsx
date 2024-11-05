import React, { useState } from 'react';
import logo from '../images/hamburgerIcon.png';
import '../css/NavBar.css';

export default function NavBar() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    
    return(
        <nav className={hamburgerOpen ? 'hamburgerOpen' : ''}>
            <button onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                {/* Here we can add an icon for our hamburger menu */}
                <img className='resize' src={logo} alt='Logo' />
            </button>

            {/* We'll conditionally render our links by hamburgerOpen */}
            {hamburgerOpen && (
                <>
                    <a href='/'>Home</a>
                    <a href='/settings'>Settings</a>
                    <a href='/recipes'>Recipes</a>
                    <a href='/logout'>Logout</a>
                </>
            )}
        </nav>
    ); //end return 
} //end NavBar function