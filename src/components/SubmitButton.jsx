export default function SubmitButton() {

    const navigate = useNavigate();  // Initialize useNavigate
    const handleClick = () => {
        e.preventDefault(); // Prevent default form submission
        onSubmit();         // Call the handleSubmit function passed as a prop
        console.log('Submit Button Clicked.');
        // navigate('/signup');  // Navigate to the /signup route
    };

    return (
        <div className='button-container'>
            <button onClick={handleClick} className='SubmitButton'>
                Submit
            </button>
        </div>
    );
}