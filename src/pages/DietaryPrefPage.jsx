import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Label } from "flowbite-react";
import Multiselect from 'multiselect-react-dropdown';
import SubmitButton from "../components/SubmitButton";
import '../css/dietPage.css';
import '../css/SubmitButton.css'


export default function dietaryPreferences() {
    const navigate = useNavigate();

    const [allergies, setAllergies] = useState([]); //might need to change to React.useState([])
    const allergyOptions = [
        {value: "no allergies", label: "None"},
        {value: "Egg", label: "Eggs"},
        {value: "Peanut", label: "Peanuts"},
        {value: "Grain", label: "Grains"},
        {value: "Seafood", label: "Seafood/Fish"},
        {value: "Sesame", label: "Seasame"},
        {value: "Shellfish", label: "Shellfish"},
        {value: "Soy", label: "Soy"},
        {value: "Tree Nuts", label: "Tree Nuts"},
        {value: "Wheat", label: "Wheat"},
        {value: "Corn", label: "Corn"},
    ];

    const [intolerances, setIntolerances] = useState([]);
    const intoleranceOptions = [
        {value: "no intolerances", label: "None"},
        {value: "Dairy", label: "Dairy"},
        {value: "Egg", label: "Eggs"},
        {value: "Gluten", label: "Gluten"},
        {value: "Grains", label: "Grains"},
        {value: "Soy", label: "Soy"},
        {value: "Wheat", label: "Wheat"},
        {value: "Corn", label: "Corn"},
    ];

    const [diets, setDiets] = useState([]);
    const dietOptions = [
        {value: "No Diet", label: "No Diet"},
        {value: "Lacto Vegetarian", label: "Lacto Vegetarian"},
        {value: "Ovo Vegetarian", label: "Ovo Vegetarian"},
        {value: "Paleo", label: "Paleo"},
        {value: "Primal", label: "Primal"},
        {value: "Pescetarian", label: "Pescetarian"},
        {value: "Vegan", label: "Vegan"},
        {value: "Vegetarian", label: "Vegetarian"},
        {value: "Ketogenic", label: "Ketogenic"},
        {value: "Whole 30", label: "Whole 30"},
    ];

    const handleAllergySelect = (selectedList) => {
        setAllergies(selectedList)
    }
    const handleAllergyRemove = (selectedList) => {
        setAllergies(selectedList);
    };

    const handleIntoleranceSelect = (selectedList) => {
        setIntolerances(selectedList)
    }
    const handleIntoleranceRemove = (selectedList) => {
        setIntolerances(selectedList);
    };

    const handleDietSelect = (selectedList) => {
        setDiets(selectedList)
    }
    const handleDietRemove = (selectedList) => {
        setDiets(selectedList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Diets selected:", diets)
        console.log("allergies selected:", allergies)
        console.log("intolerances selected:", intolerances)
        if (diets.length == 0) {
            alert('Please select a diet before proceeding.');
            return;
        }

        navigate("/dashboard", { state: {allergies, intolerances, diets } });

    }

    //return dropdown menu
    return (
        <div className="diet-container">
        <div className="diet-form-wrapper">
    
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
        </style>

        <div className="diet-title">
            <h2><center>Enter Diet Preferences</center></h2>
        </div>

            <form onSubmit={handleSubmit}>
            <div className="diet-test">
                
                <span className="dd-title">
                    <strong>Allergies</strong>
                </span>
                <div className="dropdown">
                    <Multiselect
                        // className="dropdown"
                        options={allergyOptions}
                        selectedValues={allergies}
                        onSelect={handleAllergySelect}
                        onRemove={handleAllergyRemove}
                        displayValue="label"
                        showCheckbox={true}
                    />
                </div>
                {/* DONT DELETE THESE COMMENTS */}
                {/* <select 
                    className="dropdown"
                    isMulti
                    value={allergies}
                    onChange={handleAllergyChange}
                >
                    {allergyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
            </div>
                
            <div className="diet-test">
                <span className="dd-title">
                    <strong>Intolerances</strong>
                </span>
                <div className="dropdown">
                    <Multiselect
                        options={intoleranceOptions}
                        selectedValues={intolerances}
                        onSelect={handleIntoleranceSelect}
                        onRemove={handleIntoleranceRemove}
                        displayValue="label"
                        showCheckbox={true}
                    />
                </div>
                
                {/* DONT DELETE THESE COMMENTS */}
                {/* <select
                className="dropdown"
                value={intolerances}
                onChange={(e) => setIntolerances(e.target.value)}
                >
                    {intoleranceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
            </div>
                
            <div className="diet-test">
                <span className="dd-title">
                    <strong>Diets*</strong>
                </span>
                <div className="dropdown">
                    <Multiselect 
                        options={dietOptions}
                        selectedValues={diets}
                        onSelect={handleDietSelect}
                        onRemove={handleDietRemove}
                        displayValue="label"
                        showCheckbox={true}
                        required
                    />
                </div>
                

            {/* DONT DELETE THESE COMMENTS */}
            {/* <select
                className="dropdown"
                value={diets}
                onChange={(e) => setDiets(e.target.value)}
                required
                >
                    {dietOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> */}
            </div>
               
                    <div className="diet-btn">
                        <SubmitButton/>{}
                    </div>
                    
                </form>
        </div>
        </div>
        
    ); //end return 
} //end dietaryPreferences