import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { all } from 'axios'
import { searchRecipe } from "../SpoonacularAPI/recipes"
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/RecipesPage.css'

export default function Recipes() {

	// spoonacular call - see dashboard.jsx for implementation
	const location = useLocation();
	const {
		allergies = [],
		intolerances = [],
		dietPreference = [],
	} = location.state || {};

	const [images, setImages] = useState([]); // holds images from the api call
	const [titles, setTitles] = useState([]); // holds titles
	const [descriptions, setDescriptions] = useState([]); // holds descriptions
	const [links, setLinks] = useState([]); //holds the url of each recipe
    
	// Initial set of recipes generated, for new user
	// and/or new set of preferences
	// Update to take into account a user who is logged
	// in and their current preferences from mongoDB document

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

					setImages(fetchedImages);
					setTitles(fetchedTitles);
					setLinks(fetchedLinks);
					setDescriptions(fetchedDescriptions);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchRecipes(); // Type Promise
	}, []);

	// create a function to go to the spoonacular page for the recipe
	const recipeClicked = (page) => {
		console.log("Navigating to page", page);
		window.open(page, "_blank");
	}

	// return actual page
    return (
		<div className="main-container">
			<div className="overlay-box animate__animated animate__fadeIn">
				{/* Hamborg menu */}
				<NavBar />
				
				{/* right-side box. this is on TOP of the overlay box */}
				<div className="right-overlay animate__animated animate__fadeInRight">
					<div className="user-text">
						Recipes<br />
						<div className="inner-text">Here's some recipes based on your diet</div>
					</div>

					<div className='recipe-grid'>
						{images.length > 0 ? (
								images.map((images, index) => (
									<>
										<div className="data-item ">
											<div className="recipe-card animate__animated animate__fadeInRightBig" 
												 onClick={() => recipeClicked(links[index])}
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
								<div> An error has occured... </div>
							)}
					</div>
				</div>
				{/* end of right-overlay */}
			</div>
		</div>
	);
}