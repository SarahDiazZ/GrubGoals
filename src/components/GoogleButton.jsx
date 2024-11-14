import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../css/GoogleButton.css";

function GoogleButton() {
	const navigate = useNavigate(); // Initialize useNavigate
	const handleClick = () => {
		console.log("Log In Button Clicked.");
		window.location.href = "/auth/google";
		navigate(`/dietpreferences?userID=${userID}`);
	};

	return (
		<div className="login-container">
			<button onClick={handleClick} className="loginbutton">
				Log In with Google
			</button>
		</div>
	);
}
export default GoogleButton;
