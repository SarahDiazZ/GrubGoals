import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/dashboardPage.css";
import "animate.css";
import { Chart, ArcElement, Tooltip, Legend, Title, plugins } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { all } from "axios";
import { searchRecipe } from "../SpoonacularAPI/recipes";
import { useDarkMode } from "../context/DarkModeContext";
import NavBar from "../components/NavBar"; // import Hamburger from '../components/Hamburger';

// store userID
let userID;

// react-big-calendar
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// chart.js code here
Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.legend.position = "bottom";
Chart.defaults.plugins.legend.title.display = true;

// CALORIES CHART
// NOTE: when doing chart values CALUCLATE the values first.
// as seen in `data` [currentValue, remainingValue] is the usage.

// ex. if the user's max calorie intake should be 2000 calories, and there they have ate
// 1500 calories, the `data` will be [1500, 500].
// FUTURE WILL USER VARIABLES: [current, remaining]; where current = dailyTotal; and remaining = userValue - current
const calories = {
	labels: ["Calories Consumed", "Calories Remaining"],
	datasets: [
		{
			label: "Calories",
			data: [1200, 100],
			backgroundColor: ["rgb(255, 99, 132)", "rgb(230, 230, 230)"],
			hoverOffset: 20,
		},
		//end of datasets
	],
};

const caloriesConfig = {
	type: "doughnut",
	calories,
	options: {
		cutout: "65%",
		plugins: {
			title: {
				display: true,
				text: "Calories",
			},
			legend: {
				display: false,
			},
		},
	},
};

// FATS CHART
const fats = {
	labels: ["Fats (general) Consumed", "Fats (general) Remaining"],
	datasets: [
		{
			label: "Fats",
			data: [25, 45],
			backgroundColor: ["rgb(221, 235, 145)", "rgb(230, 230, 230)"],
			hoverOffset: 25,
		},
		//end of datasets
	],
};

const fatsConfig = {
	type: "doughnut",
	calories,
	options: {
		cutout: "65%",
		plugins: {
			title: {
				display: true,
				text: "Fats",
			},
			legend: {
				display: false,
			},
		},
	},
};

// CARBS CHART
const carbs = {
	labels: ["Carbs Consumed", "Carbs Remaining"],
	datasets: [
		{
			label: "Fats",
			data: [900, 500],
			backgroundColor: ["rgb(34, 230, 158)", "rgb(230, 230, 230)"],
			hoverOffset: 20,
		},
		//end of datasets
	],
};

const carbsConfig = {
	type: "doughnut",
	calories,
	options: {
		cutout: "65%",
		plugins: {
			title: {
				display: true,
				text: "Carbohydrates",
			},
			legend: {
				display: false,
			},
		},
	},
};

// CHOLESTEROL CHART
const cholesterol = {
	labels: ["Cholesterol Consumed", "Cholesterol Remaining"],
	datasets: [
		{
			label: "Cholesterol",
			data: [45, 13],
			backgroundColor: ["rgb(196, 158, 18)", "rgb(230, 230, 230)"],
			hoverOffset: 20,
		},
		//end of datasets
	],
};

const cholesterolConfig = {
	type: "doughnut",
	calories,
	options: {
		cutout: "65%",
		plugins: {
			title: {
				display: true,
				text: "Cholesterol",
			},
			legend: {
				display: false,
			},
		},
	},
};

// set up for react-big-calendar
// months are 1 off (ex. november != 11 -> == 10)
const localizer = momentLocalizer(moment);
const events = [
    {
        title: 'Example Meal',
        start: new Date(),
        end: new Date()
    },
    {
        title: 'Another Example Meal',
        start: new Date(2024, 10, 16, 2, 30),
        end: new Date(2024, 10, 16, 2, 45)
    },{
        title: 'I should be asleep',
        start: new Date(2024, 10, 16, 3, 30),
        end: new Date(2024, 10, 16, 4, 45)
    }
]; 

export default function Dashboard() {
	const { isDarkMode } = useDarkMode();
	
	// spoonacular call - see dashboard.jsx for implementation
	const location = useLocation();
	const {
		allergies = [],
		intolerances = [],
		dietPreference = [],
	} = location.state || {};


	const urlParams = new URLSearchParams(location.search);
	userID = urlParams.get('userID');

	const [images, setImages] = useState([]); // holds images from the api call
	const [titles, setTitles] = useState([]); // holds titles
	const [descriptions, setDescriptions] = useState([]); // holds descriptions
	const [links, setLinks] = useState([]); //holds the url of each recipe
	const [recipeIds, setRecipeID] = useState([]); //holds the id of each recipe
	const [events, setEvents] = useState([]); //holds calendar data

	// holds chart data - 
	const [calorieData, setCalorieData] = useState([0, 2000]) // [consumed, remaining]
	const [fatsData, setFatsData] = useState([0, 78]);
	const [cholesterolData, setCholesterolData] = useState([0, 300]) // TODO: notify in mg
	const [carbsData, setCarbsData] = useState([0, 325])
	let dailyCalorieIntake;

    let recipeID;
	// Initial set of recipes generated, for new user
	// and/or new set of preferences
	// Update to take into account a user who is logged
	// in and their current preferences from mongoDB document

		// fetching calorie intake data
		useEffect(() => {
	
			// try to fetch intake data for calories
			const intakeData = async () =>{
				try{
					const response = await fetch(`http://localhost:4000/getIntakeData/?userID=${userID}`);
	
					if (response.ok){
						const data = await response.json();
						dailyCalorieIntake = data.targetCalories || 1350;
	
						if(dailyCalorieIntake < 1000){
							dailyCalorieIntake = 2000; // default - don't let no one starve out here
						}
	
						console.log("Target Calories: ", dailyCalorieIntake)
					}else{
						console.error("Error fetching intake data...")
					}
				}catch(err){
					console.error("Error... ", err);
				}
	
			}
			intakeData();
		}, [userID])

	// Call the async function to fetch recipes
	let response;
	useEffect(() => {
		const fetchRecipes = async () => {
			// Traverse variables from DietaryPrefPage form
			// Guranteed that all of the fields contain
			// at least one item
			let allergiesFormatted = "";
			for (let i = 0; i < allergies.length; i++) {
				allergiesFormatted += allergies[i]["label"];
				if (i < allergies.length - 1) {
					allergiesFormatted += ", ";
				}
			}
			let intolerancesFormatted = "";
			for (let i = 0; i < intolerances.length; i++) {
				intolerancesFormatted += intolerances[i]["label"];
				if (i < intolerances.length - 1) {
					intolerancesFormatted += ", ";
				}
			}

			// Only 1 Diet
			let dietFormatted = "" + dietPreference;

			// Create a Map
			let argumentsMap = new Map();

			// Create comma separated list
			// TODO: Update to incorporate logged in
			// user preferences
			let excludeIngredients = allergiesFormatted.concat(
				intolerancesFormatted
			);

			// Adding key-value pairs to the Map
			argumentsMap.set("query", "side salad");
			argumentsMap.set("includeIngredients", "");
			argumentsMap.set("excludeIngredients", excludeIngredients);
			argumentsMap.set("intolerances", intolerancesFormatted);
			argumentsMap.set("diet", dietFormatted);

			// images & titles
			try {
                // Entire Reponse Object
				response = await searchRecipe(argumentsMap, 50);
                var results = response.results
                var totalResults = response.number;
                console.log("totalResults: " + totalResults)
				console.log(results);

				// store image (or multiple of them)
				if (results.length > 0) {
					//console.log('-----> Image URL:', imageURL)
					const fetchedImages = results.map((result) => result.image);
					const fetchedTitles = results.map((result) => result.title);
					const fetchedDescriptions = results.map((result) => result.summary);
					const fetchedLinks = results.map((result => result.spoonacularSourceUrl));
					const fetchedIDs = results.map((result) => result.id)

					setImages(fetchedImages);
					setTitles(fetchedTitles);
					setLinks(fetchedLinks);
					setDescriptions(fetchedDescriptions);
					setRecipeID(fetchedIDs);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchRecipes(); // Type Promise
	}, []);

	// fetching scheduled meals
	useEffect(() => {
		const fetchScheduledMeals = async () => {
			try {
				const response = await fetch(`http://localhost:4000/getScheduledMeals/?userID=${userID}`)
				
				if (response.ok){
					const data = await response.json();

					// format the data for big calendar
					const formattedEvents = data.map((meal) => ({
						id: meal._id,
						title: meal.mealName,
						start: new Date(`${meal.date}T${meal.startTime}`),
						end: new Date(`${meal.date}T${meal.endTime}`)
					}))

					setEvents(formattedEvents);
					console.log(formattedEvents)
					console.log("Meal fetching should have finished...");

					// getting data from calendar for the charts
					const today = new Date().toISOString().slice(0, 10);
					let totalCalories = 0,
						totalFats = 0,
						totalCholesterol = 0,
						totalCarbs = 0;

					data.forEach((meal) => {
						if(meal.date === today){
							totalCalories += meal.nutrition.calories || 0
							totalFats += meal.nutrition.fat || 0
							totalCholesterol += meal.nutrition.cholesterol || 0
							totalCarbs += meal.nutrition.carbohydrates || 0
						}
					});
					console.log("Details: ", totalCalories, totalFats, totalCholesterol, totalCarbs)
					// using the values, update the chart
					setCalorieData([totalCalories, Math.max(dailyCalorieIntake - totalCalories, 0)]);
					setFatsData([totalFats, Math.max(70 - totalFats, 0)])
					setCholesterolData([totalCholesterol, Math.max(300 - totalCholesterol, 0)])
					setCarbsData([totalCarbs, Math.max(325 - totalCarbs), 0])

				}else{
					console.error("Failed to fetch meals");
				}
			}catch(err){
				console.error("Error: ", err)
			}
		}
		fetchScheduledMeals();
	}, [userID]);


	
	// create a function to go to the spoonacular page for the recipe
	const recipeClicked = (page, id, recipeName) => {
		console.log("Navigating to page", page);
		window.open(`/detailed?id=${id}&name=${recipeName}&userID=${userID}`, "_self");
		
		recipeID = id;
	}

	// return the actual page
	return (
		<div className={`main-container ${isDarkMode ? 'dark' : ''}`}>
			<div className="overlay-box animate__animated animate__fadeIn">
				{/* Hamborg menu */}
				<NavBar />
				{/* <div className='inner-text'>
                </div> */}
				{/* right-side box. this is on TOP of the overlay box */}
				<div className="right-overlay animate__animated animate__fadeInRight">
					<div className="user-text">
						Hello User! <br />
						<div className="inner-text">Today's Insights</div>
					</div>
					<div className="data-container-carousel">
						<div className="data-item">
							<Doughnut
								data={{
									labels: ["Calories Consumed", "Calories Remaining"],
									datasets: [
										{
											label: "Calories",
											data: calorieData,
											backgroundColor: ["rgb(255, 99, 132)", "rgb(230, 230, 230)"],
											hoverOffset: 20,
										},
									],
								}}
								options={caloriesConfig.options}
							/>
						</div>

						<div className="data-item">
							<Doughnut
								data={{
									labels: ["Fats Consumed", "Fats Remaining"],
									datasets: [
										{
											label: "Fats",
											data: fatsData,
											backgroundColor: ["rgb(221, 235, 145)", "rgb(230, 230, 230)"],
											hoverOffset: 20,
										},
									],
								}}
								options={fatsConfig.options}
							/>
						</div>

						<div className="data-item">
							<Doughnut
								data={{
									labels: ["Cholesterol Consumed", "Cholesterol Remaining"],
									datasets: [
										{
											label: "Cholesterol",
											data: cholesterolData,
											backgroundColor: ["rgb(196, 158, 18)", "rgb(230, 230, 230)"],
											hoverOffset: 20,
										},
									],
								}}
								options={cholesterolConfig.options}
							/>
						</div>

						<div className="data-item">
							<Doughnut
								data={{
									labels: ["Carbohydrates Consumed", "Carbohydrates Remaining"],
									datasets: [
										{
											label: "Carbohydrates",
											data: carbsData,
											backgroundColor: ["rgb(34, 230, 158)", "rgb(230, 230, 230)"],
											hoverOffset: 20,
										},
									],
								}}
								options={carbsConfig.options}
							/>
						</div>

                        <Calendar className="calendar-container"
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="agenda"  // Set the default view to agenda
                        />
					</div>{/* end of donuts */}
                    
					<div>
					Recipes
					</div>
					<div className="data-container-carousel">
						
						{images.length > 0 ? (
							images.map((images, index) => (
								<>
									<div className="data-item ">
											<div className="recipe-card animate__animated animate__fadeInRightBig" 
												 onClick={() => recipeClicked(links[index], recipeIds[index], titles[index])}
											>
												<img
													key={index}
													src={images}
													alt={`Recipe ${index + 1}`}
												/>
												<div className="recipe-title">
													{titles[index]}
												</div>
												<div className="recipe-description">
													{descriptions[index]
														.substring(
															0,
															descriptions[
																index
															].indexOf(".") + 1
														)
														.replace(
															/(<([^>]+)>)/gi,
															""
														)}
												</div>
											</div>
										</div>
								</>
							))
						) : (
							<div> Fetching data... </div>
						)}
					</div>
				</div>{" "}
				{/* end of right-overlay */}
			</div>
		</div>
	);
}
