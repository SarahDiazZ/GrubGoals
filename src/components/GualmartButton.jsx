import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "../css/LogInButton.css"

function GualmartButton() {

    const navigate = useNavigate();  // Initialize useNavigate
    const handleClick = () => {
        console.log('Log In Button Clicked.');
        navigate('/gualmart'); //navigate to login page
    };
    

    return (
        <div className='login-container'>
            <button onClick={handleClick} className='loginbutton'>
                GUALMART
            </button>
        </div>
    );
}
export default GualmartButton;