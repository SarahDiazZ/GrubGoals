import react from 'react';
import SignUpButton from '../components/SignUpButton';
import LogInButton from '../components/LogInButton';
import '../css/landingPage.css'

function LandingPage() {
    return (
        
        <div className="container">
            
           <div className="title-text">
                Grub Goals

                <div className='buttons'>
                    <SignUpButton /> {}
                    <LogInButton /> {}    
                </div>
                
            </div>
            
            
            
            
        </div>
        
    );
}

export default LandingPage;