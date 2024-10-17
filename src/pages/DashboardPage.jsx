import react from 'react';
import '../css/dashboardPage.css';
import 'animate.css'

export default function Dashboard() {
    return (
        <div className='main-container'>
            <div className='overlay-box animate__animated animate__fadeIn'>
                <div className='inner-text'>
                    Let's have a navbar here! <br/>or something, bc it's <br/> centered
                </div>

                {/* right-side box. this is on TOP of the overlay box */}
                <div className='right-overlay animate__animated animate__fadeInRight'>
                    <div className='user-text'>Hello User!</div>
                    <br/><br/><br/>

                    Today's Insights
                </div>
                
            </div>

            
        </div>
    );
}