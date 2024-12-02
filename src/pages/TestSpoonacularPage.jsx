import React, { useState, useEffect } from 'react';
import SignUpButton from '../components/SignUpButton';
import {searchRecipe, getRecipeInformation} from '../SpoonacularAPI/recipes';

import '../css/landingPage.css'

function TestSpoonacularPage() {

    const [recipes, setRecipes] = useState([]);

    // useEffect(() => {
    //         // Call the async function to fetch recipes
    //         const fetchRecipes = async () => {

    //         // Create a Map
    //         const argumentsMap = new Map();

    //         // Adding key-value pairs to the Map
    //         argumentsMap.set('query', 'side salad');
    //         argumentsMap.set('includeIngredients', 'cheese,nuts');
    //         argumentsMap.set('excludeIngredients', 'eggs');
    //         argumentsMap.set('intolerances', 'gluten');
            
    //         const results = await searchRecipe(argumentsMap);
    //         setRecipes(results);
    //     };
    
    //     fetchRecipes();
    //   }, []);

      useEffect(() => {
		const fetchInfo = async () => {
			const response = await getRecipeInformation(640742, true);
            console.log(response)
		};

		fetchInfo(); // Type Promise
	}, []);

    return (
        <div className="background">
            <div className="container" style={{color:"rgb(197, 87, 53)"}}>
                <br/>
                TestSpoonacularPage
            </div>
            
            <SignUpButton /> {}
        </div>
    );
}

export default TestSpoonacularPage;