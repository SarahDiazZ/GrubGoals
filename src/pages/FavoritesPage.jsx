import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { all } from 'axios'
import { searchRecipe } from "../SpoonacularAPI/recipes"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'
import '../css/RecipesPage.css'

let userID;

export default function FavoritesPage(){
    const { isDarkMode } = useDarkMode();

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    const [images, setImages] = useState([]); // holds images from the api call
    const [titles, setTitles] = useState([]); // holds titles
    const [recipeIds, setRecipeID] = useState([]); //holds the id of each recipe

    userID = urlParams.get('userID');
    // fetching favorited meals
    useEffect(() => {
        const fetchFavoritedMeals = async () => {
            try{
                const response = await fetch(`http://localhost:4000/getFavorites/?userID=${userID}`)

                if (response.ok){
                    const data = await response.json()
                    console.log("Favorite Meals Response: ", data)
                    console.log("Fetching favorite meals should have finished...")

                    const fetchedImages = data.map((item) => item.mealImage)
                    const fetchedTitles = data.map((item) => item.mealName);
                    const fetchedIDs = data.map((item) => item.mealID)

                    setImages(fetchedImages);
                    setTitles(fetchedTitles);
                    setRecipeID(fetchedIDs);

                }else{
                    console.error("Failed to fetch favorites")
                }
            }catch(err){
                console.error("Error: ", err)
            }
        }

        fetchFavoritedMeals();
    }, [userID])

    // create a function to go to the spoonacular page for the recipe
    let recipeID;
	const recipeClicked = (id, recipeName) => {
		window.open(`/detailed?id=${id}&name=${recipeName}&userID=${userID}`, "_self");
		recipeID = id;
	}


    // return actual page
    return (
        <div className={`main-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="overlay-box animate__animated animate__fadeIn">
                <NavBar />

                <div className="right-overlay animate__animated animate__fadeInRight">
                    <div className="user-text">
                        Favorite Recipes<br />
                        <div className="inner-text">Here's the recipes you have marked as favorite!</div>
                    </div>

                    <div className='recipe-grid'>
                        {images.length > 0 ? (
                            images.map((images, index) => (
                                <>
                                    <div className="data-item ">
                                        <div className="recipe-card animate__animated animate__fadeInRightBig"
                                            onClick={() => recipeClicked(recipeIds[index], titles[index])}
                                        >
                                            <img
                                                key={index}
                                                src={images}
                                                alt={`Recipe ${index + 1}`}
                                            />
                                            <div className="recipe-title">
                                                {titles[index]}
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
            </div>


        </div>
    )
}