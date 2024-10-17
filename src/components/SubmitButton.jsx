import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/SubmitButton.css'

export default function SubmitButton({handleSubmit}) {
    // const navigate = useNavigate();  //initialize useNavigate

    // const handleSubmit = (e) => {
    //     e.preventDefault(); //prevent default form submission
    //     console.log('Submit Button Clicked.');
    //     // navigate('/dashboard');
    // };

    return (
        <div className='submit-btn-container'>
            <button onClick={handleSubmit} className='submit-btn'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');
            </style>
                Submit
            </button>
        </div>
    );
}