import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SettingsNavBar from "../components/SettingsNavBar";
import '../css/SettingsPage.css'
import 'animate.css'


export default function SettingsPage() {

    return (
        <div className="settings-main-container">
            <div className='settings-overlay-box animate__animated animate__fadeIn'>
                <SettingsNavBar />
                <div className='right-overlay animate__animated animate__fadeInRight'>
                    <div className="settings-text">
                        <h1>Settings</h1>
                    </div>
                    
                </div>
            </div>
        </div>
    ); 
}; //end SettingsPage function