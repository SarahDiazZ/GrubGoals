import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { all } from 'axios'
import { searchRecipe } from "../SpoonacularAPI/recipes"
import { getRecipeInformation } from '../SpoonacularAPI/recipes'
import { useLocation } from 'react-router-dom'

import '../css/DetailedView.css'

// a function to remove HTML tags from text
function removeHTMLTags(text){
    return text.replace(/(<([^>]+)>)/gi, "");
}

export default function DetailedPageView(){
    // get data from url
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const recipeID = urlParams.get('id');
    const recipeTitle = urlParams.get('name');
    const userID = urlParams.get('userID');
    //console.log("Found id: ", recipeID);

    // data we need to show
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');
    const [summary, setSummary] = useState('');
    const [instructions, setInstructions] = useState([]);
    const [savedResponse, setSavedResponse] = useState(null);
    const [scheduleDate, setScheduleDate] = useState(''); // For the selected date
    const [scheduleTime, setScheduleTime] = useState('');

    useEffect(() => {

        const fetchRecipeData = async () =>{
            try{
                // holds all the recipe information
                const response = await getRecipeInformation(recipeID, true);
                setSavedResponse(response); // will come in handy when doing favorites
                console.log("---> response: ", response)

                // gathering information
                setImage(response.image);
                setSummary(removeHTMLTags(response.summary));
                setIngredients(response.extendedIngredients);
                
                // check if instructions exists; if yes, set it
                const steps = response.analyzedInstructions?.[0]?.steps || [];
                setInstructions(steps);

            }catch (err){
                console.log(err);
            }
        }

        fetchRecipeData(); // waits for this promise
    }, [recipeID]);

    // a button for adding favorite recipes
    // IF THIS BREAKS CHECK SERVER.JS FIRST
    const markFavorite = async () => {
        const favoriteMeal = {
            userID: userID,
            mealID: recipeID,
            mealImage: savedResponse.image || "image not found",
            mealName: recipeTitle,
            nutrition: {
                calories: savedResponse.nutrition.nutrients[0].amount || 0,
                cholesterol: savedResponse.nutrition.nutrients[6].amount || 0,
                carbohydrates: savedResponse.nutrition.nutrients[3].amount || 0,
                fat: savedResponse.nutrition.nutrients[1].amount || 0
            },
            prepTime: savedResponse.readyInMinutes || 0,
            ingredients: ingredients.map((i) => i.original),
            instructions: instructions.map((i) => i.step)
        }

        // attempt to save to favoriteMeals 
        try{
            const res = await fetch("http://localhost:4000/favoriteMeals", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(favoriteMeal)
            })

            if(res.ok){
                const data = await res.json();
                alert("Recipe added to favorites!")
                console.log("Meal added to favorites: ", data.savedMeal) // savedMeal found in server.js
            }else if (res.status === 409){
                // this means that the meal is already in favorites
                alert("This recipe is already in your favorites")
            }else{
                console.error("Failed to add to Favorites");
            }
        }catch(err){
            console.error("ERROR:", err);
        }
    };


    const scheduleMeal = async () =>{
        if (!scheduleDate || !scheduleTime){
            alert("Please select a date and time to schedule the meal")
            return;
        }

        // // some time math to add an hour to startTime for endTime
        let time = scheduleTime
        let [hours, minutes] = time.split(":").map(Number);
        let endDateTime = new Date();
        endDateTime.setHours(hours, minutes);
        endDateTime.setHours(endDateTime.getHours() + 1);
        let updatedEndTime = endDateTime.toTimeString().slice(0, 5);

        //const endMealTime = endTimeDate.toTimeString().slice(0, 5);

        const mealToSchedule = {
            userID: userID,
            mealName: recipeTitle,
            date: scheduleDate, // TODO: change
            startTime: scheduleTime,
            endTime: updatedEndTime,
            nutrition: {
                calories: savedResponse.nutrition.nutrients[0].amount || 0,
                cholesterol: savedResponse.nutrition.nutrients[6].amount || 0,
                carbohydrates: savedResponse.nutrition.nutrients[3].amount || 0,
                fat: savedResponse.nutrition.nutrients[1].amount || 0
            },
        }
        console.log(mealToSchedule);

        try{
            const res = await fetch("http://localhost:4000/scheduleMeal", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(mealToSchedule)
            })

            if (res.ok){
                const data = await res.json();
                alert(`Recipe successfully scheduled for ${scheduleDate} at ${scheduleTime}`)
                console.log("Saved recipe information: ", data.scheduledMeal)
            }else if (res.status === 409){
                alert("This recipe has already been added for this time slot")
            }else{
                console.error("Failed to add to calendar")
            }
        }catch(error){
            console.error(error);
        }
    };

    // return the actual page here
    return (
		<div className="main-container">
			<div className="overlay-box animate__animated animate__fadeIn">
				{/* Hamborg menu */}
				<NavBar />
				
				{/* right-side box. this is on TOP of the overlay box */}
				<div className="right-overlay animate__animated animate__fadeInRight">
					<div className="user-text">
						Detailed Recipe - {recipeTitle} 
                        <button onClick={markFavorite}>Mark As Favorite</button>
                        <br />
                        <br />
					</div>
                    
                    <div className='recipe-information-pic-summary' id="summary">
                        <img
                            key={"recipeImage"}
                            src={image}
                            alt={`image of ${recipeTitle}`}
                        />
                        
                        <div className='recipe-summary'>
                            {summary} <br/> <br/> <b>Source:</b> Spoonacular
                        </div>
                        
                    </div>

                    <div className='ingredients-header' id="ingredients">
                            To begin making {recipeTitle}, you'll need the following ingredients: <br/>
                    </div>

                    <div className='recipe-information-ingredients'>
                        {/* list out each ingredient */}
                        <ul>
                            {
                                ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.original}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    
                    <div className='instructions-header' id="instructions">
                        Follow these instructions for something tasty!
                    </div>
                    <div className='recipe-information-instructions'>
                        {/* list out each instruction */}
                        <ol type="1">
                            {
                                instructions.map((instructionStep, index) => (
                                    <li key={index}>
                                        {instructionStep.step}
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                    
                    <div className='schedule-meal' id='schedule'>
                        <div className='schedule-meal-input'>
                            <div className="schedule-header">
                                <h3>Schedule this meal?</h3>
                            </div>
                            <div className='time-input'>
                                <input 
                                    type="date"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                />
                                <input
                                    type="time"
                                    value={scheduleTime}
                                    onChange={(e) => setScheduleTime(e.target.value)}
                                />
                                <button onClick={scheduleMeal}>Schedule Meal</button>
                            </div>
                        </div>
                    </div>
				</div>{/* end of right-overlay */}
			</div>
		</div>
	);
}