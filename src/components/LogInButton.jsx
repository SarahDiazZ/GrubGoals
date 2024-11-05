import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "../css/LogInButton.css"

function LogInButton() {

    const navigate = useNavigate();  // Initialize useNavigate
    const handleClick = () => {
        console.log('Log In Button Clicked.');
        navigate('/login'); //navigate to login page
    };
    

    return (
        <div className='login-container'>
            <button onClick={handleClick} className='loginbutton'>
                Log In
            </button>
        </div>
    );
}
export default LogInButton;