import react from 'react';
import SignUpButton from '../components/SignUpButton';
import LogInButton from '../components/LogInButton';
import '../css/landingPage.css';
import 'animate.css';
function LandingPage() {
    return (
        
        <div className="container ">
            
           <div className="title-container title-text animate__animated animate__fadeInDown">
                Grub Goals <br/> 
                <div className='sub-text animate__animated animate__fadeInDown animate__delay-1s' style={{fontStyle:'italic'}}>
                    A smarter meal-planning for a smarter you!
                </div>

                <div className='buttons animate__animated animate__fadeInDown animate__delay-2s'>
                    <SignUpButton /> {}
                    <LogInButton /> {}    
                </div>
                
            </div>
            

            <section id='mission' className='content-container'>
                <div className='sub-header'>
                    Our Mission

                    <div className='main-text content-container'>
                        At Grub Gurus, we understand the importance of healthy eating and the challenges that come with planning balanced meals. 
                        Our team has collectively navigated through various diets, and we know firsthand how overwhelming it can feel when you're just getting started. 
                        We believe that meal planning shouldn't be stressful—it should be empowering.
                        <br/><br/>
                        With diverse backgrounds and unique experiences, each member of the Grub Gurus team brings a fresh perspective to the table. 
                        Our goal is to provide you with the tools and guidance to make informed decisions about your meals, without the hassle, confusion, or judgment.
                        <br/><br/>
                        Whether you're starting a new fitness journey, managing dietary restrictions, or simply aiming for a healthier lifestyle, Grub Gurus is here to help you reach your goals with confidence. 
                        Let's take the guesswork out of eating well and make healthy choices easier, <b>together.</b>

                    </div>
                </div>

                
            </section>
            
            

        </div> // end container
        
    );
}

export default LandingPage;