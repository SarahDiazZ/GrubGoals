import axios from 'axios';
const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const searchRecipe = async(argumentMap) => {

  // Obtain Map Information 

  // Required Arguments
  const query = argumentMap.get('query');

  // Optional Arguments
  var includeIngredients = argumentMap.get('includeIngredients'); // Comma separated List
  var excludeIngredients = argumentMap.get('excludeIngredients'); // Comma separated List
  var intolerances = argumentMap.get('intolerances'); // Comma separated List
  var addRecipeInformation = argumentMap.get('addRecipeInformation'); // True or False

  if(intolerances == undefined){
    intolerances = '';
  }

  if(includeIngredients == undefined){
    includeIngredients = '';
  }

  if(excludeIngredients == undefined){
    excludeIngredients = '';
  }

  try {
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
    const response = await axios.get(url, {
      headers: {
          'x-rapidapi-key': spoonacularApiKey,
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      },
      params: {
          query: query,
          intolerances: intolerances,
          includeIngredients: includeIngredients,
          excludeIngredients: excludeIngredients,
          addRecipeInformation: 'true',
        },
    }
    );
    console.log(response.data.results);
  } catch (error) {
    console.error('Error:', error);
  }
}

  
