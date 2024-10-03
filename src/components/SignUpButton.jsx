import react from 'react';
import "../css/SignUpButton.css"

function SignUpButton() {
    const handleClick = () => {
        console.log('Sign Up Button Clicked.');
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