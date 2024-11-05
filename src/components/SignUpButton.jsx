import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "../css/SignUpButton.css"

export default function SignUpButton() {
    const navigate = useNavigate();  // Initialize useNavigate
    const handleClick = () => {
        console.log('Sign Up Button Clicked.');
        navigate('/signup');  // Navigate to the /signup route
    };

    return (
        <div className='button-container'>
            <button onClick={handleClick} className='signupbutton'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
            </style>
                Sign Up
            </button>
        </div>
    );
}
