import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SignUpButton from '../components/SignUpButton';
import '../css/SignUpPage.css'
import DashboardPage from './DashboardPage';
import DietaryPrefPage from './DietaryPrefPage';


export default function SignUpPage() {
    //fields for registration
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/signup", { firstName, lastName, userName, email, password, confirmPassword })
        .then(result => {console.log(result)
        navigate("/dietpreferences")
        })
        .catch(err => console.log(err))
        console.log({ firstName, lastName, userName, email, password });

    } //end handleSubmit

    return (
        <div className="signup-container">
        <div className="signup-form-wrapper">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
        </style>
        <div className="title">
            <h2><center>Sign Up</center></h2>
        </div>

            <form onSubmit={handleSubmit}>
                <div className="test">
                    <div className="input-box">
                        <span>
                            <strong>First Name</strong>
                        </span>
                    
                        <input type="text" 
                        placeholder='Enter First Name' 
                        autoComplete='off' 
                        name='email' 
                        className='form-input' 
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="test">
                    <div className="input-box">
                        <span>
                            <strong>Last Name</strong>
                        </span>
                    
                        <input type="text" 
                        placeholder='Enter Last Name' 
                        autoComplete='off' 
                        name='email' 
                        className='form-input' 
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="test">
                    <div className='input-box'>
                        <span>
                            <strong>Email</strong>
                        </span>
                    
                        <input type="text" 
                        placeholder='Enter Email' 
                        autoComplete='off' 
                        name='email' 
                        className='form-input' 
                        onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                </div>

                <div className="test">
                    <div className='input-box'>
                        <span>
                            <strong>Username</strong>
                        </span>
                    
                        <input type="text" 
                        placeholder='Enter Name' 
                        autoComplete='off' 
                        name='email' 
                        className='form-input' 
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="test">
                    <div className='input-box'>
                        <span>
                            <strong>Password</strong>
                        </span>
                    
                        <input type="password" 
                        placeholder='Enter Password' 
                        name='password' 
                        className='form-input' 
                        onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    
                </div>
                <div className="test">
                    <div className='input-box'>
                        <span>
                            <strong>Confirm Password</strong>
                        </span>
                    
                        <input type="password" 
                        placeholder='Confirm Password' 
                        name='password' 
                        className='form-input' 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className='signup-btn'>
                    <SignUpButton/>{}
                </div>

                </form>
                {/* <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link> */}
        </div>
        </div>
    );
} //end function