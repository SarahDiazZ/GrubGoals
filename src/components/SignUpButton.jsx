import react from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import "../css/SignUpButton.css"

function SignUpButton() {

    const navigate = useNavigate();  // Initialize useNavigate
    const handleClick = () => {
        console.log('Sign Up Button Clicked.');
        navigate('/signup');  // Navigate to the /signup route
    };

    return (
        <div className='button-container'>
            <button onClick={handleClick} className='signupbutton'>
                Sign Up
            </button>
        </div>
    );
}
export default SignUpButton;

