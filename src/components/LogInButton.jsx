import react from 'react';
import "../css/LogInButton.css"

function LogInButton() {
    const handleClick = () => {
        console.log('Log In Button Clicked.');
    };

    return (
        <div className='login-container'>
            <button onClick={handleClick} className='loginbutton'>
                Log In
            </button>
        </div>
    );
}
export default LogInButton;