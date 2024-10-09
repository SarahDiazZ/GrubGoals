import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SignUpButton from '../components/SignUpButton';
import '../css/SignUpPage.css'

export default function SignUpPage() {
    //fields for registration
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5173/register", { firstName, lastName, userName, email, confirmPassword })
        .then(result => {console.log(result)
        navigate("/login")
        })
        .catch(err => console.log(err))
    } //end handleSubmit

    return (
        <div className="signup-container">
        <div className="signup-form-wrapper">
        <div className="title">
            <h2><center>Sign Up</center></h2>
        </div>
        

            <form onSubmit={handleSubmit}>
                <div className="test">
                    <div className="input-box">
                        <label htmlFor="email">
                            <strong>First Name</strong>
                        </label>
                    
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
                        <label htmlFor="email">
                            <strong>Last Name</strong>
                        </label>
                    
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
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                    
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
                        <label htmlFor="email">
                            <strong>Username</strong>
                        </label>
                    
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
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                    
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
                        <label htmlFor="email">
                            <strong>Confirm Password</strong>
                        </label>
                    
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
                
                {/* <button type="submit" className="btn btn-success w-100 rounded-0">
                    Sign Up
                </button> */}
                </form>
                {/* <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link> */}
            
        </div>
    </div>
    );
} //end function