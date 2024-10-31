import react from 'react';
import { useLocation } from 'react-router-dom';
import '../css/dashboardPage.css';
import 'animate.css'
import {Chart, ArcElement, Tooltip, Legend, Title, plugins} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { all } from 'axios';
import {searchRecipe} from '../SpoonacularAPI/recipes';

// chart.js code here
Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.title.display = true;

// CALORIES CHART
// NOTE: when doing chart values CALUCLATE the values first.
// as seen in `data` [currentValue, remainingValue] is the usage. 

// ex. if the user's max calorie intake should be 2000 calories, and there they have ate
// 1500 calories, the `data` will be [1500, 500]. 
// FUTURE WILL USER VARIABLES: [current, remaining]; where current = dailyTotal; and remaining = userValue - current
const calories = {
    labels: [
      'Calories Consumed',
      'Calories Remaining'
    ],
    datasets: [
        {
            label: 'Calories',
            data: [1200, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 255, 255'
            ],
            borderColor: ['#00000'], // Border for segments
            borderWidth: 1,
            hoverOffset: 4
        }
    //end of datasets
    ]

};

const caloriesConfig = {
    type: 'doughnut',
    calories,
    options: {
        cutout: '65%',
        plugins: {
            title: {
                display: true,
                text: 'Calories'
            },
             legend: {
            display: false
        }
        } 
    }
};

// FATS CHART
const fats = {
    labels: [
      'Fats (general) Consumed',
      'Fats (general) Remaining'
    ],
    datasets: [
        {
            label: 'Fats',
            data: [25, 45],
            backgroundColor: [
                'rgb(221, 235, 145)',
                'rgb(255, 255, 255'
            ],
            borderColor: ['#00000'], // Border for segments
            borderWidth: 1,
            hoverOffset: 4
        }
    //end of datasets
    ]

};

const fatsConfig = {
    type: 'doughnut',
    calories,
    options: {
        cutout: '65%',
        plugins: {
            title: {
                display: true,
                text: 'Fats'
            },
             legend: {
            display: false
        }
        } 
    }
};

// CARBS CHART
const carbs = {
    labels: [
      'Fats (general) Consumed',
      'Fats (general) Remaining'
    ],
    datasets: [
        {
            label: 'Fats',
            data: [900, 500],
            backgroundColor: [
                'rgb(34, 230, 158)',
                'rgb(255, 255, 255)'
            ],
            borderColor: ['#00000'], // Border for segments
            borderWidth: 1,
            hoverOffset: 4
        }
    //end of datasets
    ]

};

const carbsConfig = {
    type: 'doughnut',
    calories,
    options: {
        cutout: '65%',
        plugins: {
            title: {
                display: true,
                text: 'Carbohydrates'
            },
             legend: {
            display: false
        }
        } 
    }
};


// CHOLESTEROL CHART
const cholesterol = {
    labels: [
      'Fats (general) Consumed',
      'Fats (general) Remaining'
    ],
    datasets: [
        {
            label: 'Fats',
            data: [45, 13],
            backgroundColor: [
                'rgb(196, 158, 18)',
                'rgb(255, 255, 255)'
            ],
            borderColor: ['#00000'], // Border for segments
            borderWidth: 1,
            hoverOffset: 4
        }
    //end of datasets
    ]

};

const cholesterolConfig = {
    type: 'doughnut',
    calories,
    options: {
        cutout: '65%',
        plugins: {
            title: {
                display: true,
                text: 'Cholesterol'
            },
             legend: {
            display: false
        }
        } 
    }
};

export default function Dashboard() {

    // Spoonacular API Call using response data from DietaryPrefPage.jsx

    // Used to anchor the DietaryPrefPage
    // This way, we don't have the handle the
    // case where the allergies, intolerances, diets
    // variables are empty if you navigate to this page 
    // from another button or directly using the a URL.
    const location = useLocation();
    const { allergies = [], intolerances = [], dietPreference = [] } = location.state || {};

    // Initial set of recipes generated, for new user
    // and/or new set of preferences
    // Update to take into account a user who is logged
    // in and their current preferences from mongoDB document

    // Call the async function to fetch recipes
    let results;
    const fetchRecipes = async () => {

        // Traverse variables from DietaryPrefPage form
        // Guranteed that all of the fields contain
        // at least one item
        let allergiesFormatted = ''
        for (let i = 0; i < allergies.length; i++) {
            allergiesFormatted += allergies[i]['label'];
            if (i < allergies.length - 1) {
                allergiesFormatted += ', ';
            }
        }
        let intolerancesFormatted = '';
        for (let i = 0; i < intolerances.length; i++) {
            intolerancesFormatted += intolerances[i]['label'];
            if (i < intolerances.length - 1) {
                intolerancesFormatted += ', ';
            }
        }

        // Only 1 Diet
        let dietFormatted = '' + dietPreference;

        // Create a Map
        let argumentsMap = new Map();

        // Create comma separated list 
        // TODO: Update to incorporate logged in
        // user preferences
        let excludeIngredients = allergiesFormatted.concat(intolerancesFormatted);

        // Adding key-value pairs to the Map
        argumentsMap.set('query', 'side salad');
        argumentsMap.set('includeIngredients', '');
        argumentsMap.set('excludeIngredients', excludeIngredients);
        argumentsMap.set('intolerances', intolerancesFormatted);
        argumentsMap.set('diet', dietFormatted);
        
        try {
            results = await searchRecipe(argumentsMap);
            console.log(results);
            console.log(results[0]);
        }catch (error){
            console.log(error);
        }
    };

    fetchRecipes(); // Type Promise

    // return the actual page
    return (
        <div className='main-container'>
            <div className='overlay-box animate__animated animate__fadeIn'>
                <div className='inner-text'>
                    Let's have a navbar here! <br/>or something, bc it's <br/> centered
                </div>

                {/* right-side box. this is on TOP of the overlay box */}
                <div className='right-overlay animate__animated animate__fadeInRight'>
                    <div className='user-text'>
                        Hello User! <br/> 
                        <div className='inner-text'>Today's Insights</div>
                    </div>
                    
                    <div className='data-container-carousel'>
                        
                        <div className='data-item'>
                            <Doughnut data={calories} options={caloriesConfig.options} />
                        </div>

                        <div className='data-item'>
                            <Doughnut data={fats} options={fatsConfig.options} />
                        </div>

                        <div className='data-item'>
                            <Doughnut data={cholesterol} options={cholesterolConfig.options} />
                        </div>

                        <div className='data-item'>
                            <Doughnut data={carbs} options={carbsConfig.options} />
                        </div>

                        <div className='data-item'>
                            <Doughnut data={carbs} options={carbsConfig.options} />
                        </div>

                        <div className='data-item'>
                            <Doughnut data={carbs} options={carbsConfig.options} />
                        </div>

                    </div>
                </div>
                
            </div>

            
        </div>
    );
}