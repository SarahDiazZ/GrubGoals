import React from "react";
import SignUpButton from "../components/SignUpButton";
import LogInButton from "../components/LogInButton";
import GualmartButton from "../components/GualmartButton";
import GoogleButton from "../components/GoogleButton";
import "../css/landingPage.css";
import "animate.css";

import sarah from '../images/Sarah.png'
import austin from '../images/Austin.png'
import mariano from '../images/Mariano.png'
import alen from '../images/Alen.png'

function LandingPage() {
	return (
		<div className="container ">
			<div className="title-container title-text animate__animated animate__fadeInDown">
				Grub Goals <br />
				<div
					className="sub-text animate__animated animate__fadeInDown animate__delay-1s"
					style={{ fontStyle: "italic" }}
				>
					Smart meal planning for a smarter you!
				</div>
				<div className="buttons animate__animated animate__fadeInDown animate__delay-2s">
					<SignUpButton /> {}
					<LogInButton /> {}
					<GualmartButton /> {}
					<GoogleButton /> {}
				</div>
			</div>

			<section id="mission" className="content-container">
				<div className="sub-header">
					Our Mission
					<div className="main-text content-container">
						At Grub Gurus, we understand the importance of healthy
						eating and the challenges that come with planning
						balanced meals. Our team has collectively navigated
						through various diets, and we know firsthand how
						overwhelming it can feel when you're just getting
						started. We believe that meal planning shouldn't be
						stressful—it should be empowering.
						<br />
						<br />
						With diverse backgrounds and unique experiences, each
						member of the Grub Gurus team brings a fresh perspective
						to the table. Our goal is to provide you with the tools
						and guidance to make informed decisions about your
						meals, without the hassle, confusion, or judgment.
						<br />
						<br />
						Whether you're starting a new fitness journey, managing
						dietary restrictions, or simply aiming for a healthier
						lifestyle, Grub Gurus is here to help you reach your
						goals with confidence. Let's take the guesswork out of
						eating well and make healthy choices easier,{" "}
						<b>together.</b>
						<br/>
						<br/>
						<br/>
						<hr/>
					</div>

					

					<div className="developers">
							<div className="dev-header">Meet the Team</div>

							<div className="profile-forward">
								<img 
									src={sarah}
									alt="picture of sarah"
								/>

								<div className="profile-text">
									<div className="dev-title">
										Sarah Diaz - Full Stack Developer
									</div>
									<div className="profile-detail">
										Passionate about simplifying meal planning and empowering healthy lifestyles. 
										I'm a senior Computer Science student with experience in React, Node.js, and MongoDB, working to make 
										Grub Goals a seamless and personalized experience for users. 
										When I'm not coding, you can find me at the gym, hanging out with friends, or playing Black Ops 6.
									</div>
								</div>
							</div>

							<div className="profile-reverse">
								<img 
									src={austin}
									alt="picture of austin"
								/>

								<div className="profile-text">
									<div className="dev-title">
										Austin Wilson - Backend & Database
									</div>
									<div className="profile-detail">
										Highly motivated individual working on backend API calls to Spoonacular and ensuring seamless 
										database functionality with mongodb/mongoose. Focused on returning accurate data based on user
										diets, wants, and restrictions. 
									</div>
								</div>
							</div>

							<div className="profile-forward">
								<img 
									src={mariano}
									alt="picture of mariano"
								/>

								<div className="profile-text">
									<div className="dev-title">
										Mariano Garcia - Database & AWS
									</div>
									<div className="profile-detail">
										Dev by day, gamer by night. Focusing on database functionality with MongoDB and 
										deploying the web application with AWS EC2. Worked with Google Authentication to provide
										users with a simple way of creating an account/logging in.
									</div>
								</div>
							</div>

							<div className="profile-reverse">
								<img 
									src={alen}
									alt="picture of alen"
								/>

								<div className="profile-text">
									<div className="dev-title">
										Alen Tan - Frontend & Quality Assurance
									</div>
									<div className="profile-detail">
										Leveraging technologies such as React, Chart.js, and HTML/CSS; helped Grub Goals
										come alive. Focused on user experience/interface, attention to detail, and debugging - ensuring   
										Grub Goals runs seamlessly - one bug at a time.
									</div>
								</div>
							</div>
					</div>
				</div>
			</section>
		</div> // end container
	);
}

export default LandingPage;
