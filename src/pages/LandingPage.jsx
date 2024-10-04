import react from 'react';
import SignUpButton from '../components/SignUpButton';
import LogInButton from '../components/LogInButton';
import '../css/landingPage.css'

function LandingPage() {
    return (
        <div className="background">
            <div className="container" style={{color:"rgb(197, 87, 53)"}}>
                <br/>
                Grub Goals
            </div>
            
            <SignUpButton /> {}
            <LogInButton /> {}
        </div>
    );
}

export default LandingPage;