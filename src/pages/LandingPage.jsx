import react from 'react';
import SignUpButton from '../components/SignUpButton';
import LogInButton from '../components/LogInButton';

function LandingPage(){
    return (
        <div className="background">
            <h1>Grub Goals</h1>
            <SignUpButton /> {SignUpButton}
            <LogInButton /> {LogInButton}
        </div>
    );
}

export default LandingPage;