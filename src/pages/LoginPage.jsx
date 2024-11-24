import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogInButton from "../components/LogInButton";
import DashboardPage from "./DashboardPage";
import "../css/LoginPage.css";

export default function LoginPage() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				"http://ec2-3-12-104-199.us-east-2.compute.amazonaws.com:4000/login",
				{
					user: { userName, password } //helps us use req.body.user
				}
			)
			.then((response) => {
				console.log(response);
				if (response.data.success) {
					const userID = response.data.userID;
					navigate(`/dashboard?userID=${userID}`);
				}
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 404) {
						alert("Username not found. Please sign up.");
						navigate("/signup");
					} //end inner if
					else if (err.response.status === 401) {
						alert("Incorrect password. Please try again.");
					} //end else if
					else {
						alert("Server error. Please try again later.");
					} //end inner else
				} //end outer if
				else {
					console.error(err);
				} //end else
			});
		console.log({ userName, password });
	}; //end handleSubmit

	return (
		//We're using the same className's as the signup page
		<div className="signup-container">
			<div className="signup-form-wrapper">
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
				</style>
				<div className="title">
					<h2>
						<center>Log In</center>
					</h2>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="test">
						<div className="input-box">
							<span>
								<strong>Username</strong>
							</span>

							<input
								type="text"
								placeholder="Enter Username"
								autoComplete="off"
								name="email"
								className="form-input"
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>
					</div>

					<div className="test">
						<div className="input-box">
							<span>
								<strong>Password</strong>
							</span>

							<input
								type="password"
								placeholder="Enter Password"
								name="password"
								className="form-input"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="login-btn">
						<LogInButton />
						{}
					</div>
				</form>
			</div>
		</div>
	); //end return
} //end LoginPage()
