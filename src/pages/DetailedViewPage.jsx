import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { all } from 'axios'
import { searchRecipe } from "../SpoonacularAPI/recipes"
import { getRecipeInformation } from '../SpoonacularAPI/recipes'
import { useLocation } from 'react-router-dom'

import '../css/DetailedView.css'

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
    let instructions;

    useEffect(() => {
         // holds all the recipe information
        let response;

        const fetchRecipeData = async () =>{
            try{
                response = await getRecipeInformation(recipeID, true);
                console.log("---> response: ", response)

                // gathering information
                setImage(response.image);

                console.log("image link: ", response.image)
                console.log("instructions: ", response.instructions)
                
                for (let i = 0; i < response.extendedIngredients.length; i++){
                    console.log(`Ingredient #${i}: `, response.extendedIngredients[i].name)
                }
            }catch (err){
                console.log(err);
            }
        }

        fetchRecipeData(); // waits for this promise
    }), [];

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
                    
                    <div className='recipe-information'>
                        <img
                            key={"recipeImage"}
                            src={image}
                            alt={`image of ${recipeTitle}`}
                        />

                        
                    </div>
				</div>{/* end of right-overlay */}
			</div>
		</div>
	);
}