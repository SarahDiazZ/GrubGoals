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
    //console.log("Found id: ", recipeID);

    // data we need to show
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState('');
    const [summary, setSummary] = useState('');
    const [instructions, setInstructions] = useState([]);
    useEffect(() => {
         // holds all the recipe information
        let response;

        const fetchRecipeData = async () =>{
            try{
                response = await getRecipeInformation(recipeID, true);
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
				</div>{/* end of right-overlay */}
			</div>
		</div>
	);
}