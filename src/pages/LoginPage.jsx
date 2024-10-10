import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LogInButton from '../components/LogInButton';
import DashboardPage from './DashboardPage'
import '../css/LoginPage.css'



export default function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/login", { userName, password })
        .then(result => {
            console.log(result)
            if (result.data === "Success") {
                navigate("/dashboard")
            }
            else {
                navigate("/signup")
                alert("You are not registered")

            }
       
        })
        .catch(err => console.log(err))
        console.log({ userName, password });

    } //end handleSubmit

    return (
        //We're using the same className's as the signup page
        <div className="signup-container">
        <div className="signup-form-wrapper">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
        </style>
        <div className="title">
            <h2><center>Log In</center></h2>
        </div>

            <form onSubmit={handleSubmit}>
                <div className="test">
                    <div className='input-box'>
                        <span>
                            <strong>Username</strong>
                        </span>
                    
                        <input type="text" 
                        placeholder='Enter Username' 
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

                <div className='login-btn'>
                    <LogInButton/>{}
                </div>
                   
                </form>
        </div>
        </div>
    ) //end return 
} //end LoginPage()