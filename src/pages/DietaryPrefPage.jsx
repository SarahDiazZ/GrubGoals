import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label } from "flowbite-react";
import Select from "react-select";
import SubmitButton from "../components/SubmitButton";
import "../css/dietPage.css";
import "../css/SubmitButton.css";

export default function dietaryPreferences() {
	const navigate = useNavigate();
	const [age, setAge] = useState(""); //ensure age is initialized
	const [weight, setWeight] = useState(""); //ensure weight is initialized
	const [height, setHeight] = useState(""); //ensure height is initialized
	const [gender, setGender] = useState("");

	const [allergies, setAllergies] = useState([]); //might need to change to React.useState([])
	const allergyOptions = [
		{ value: "no allergies", label: "None" },
		{ value: "Egg", label: "Eggs" },
		{ value: "Peanut", label: "Peanuts" },
		{ value: "Grain", label: "Grains" },
		{ value: "Seafood", label: "Seafood/Fish" },
		{ value: "Sesame", label: "Seasame" },
		{ value: "Shellfish", label: "Shellfish" },
		{ value: "Soy", label: "Soy" },
		{ value: "Tree Nuts", label: "Tree Nuts" },
		{ value: "Wheat", label: "Wheat" },
		{ value: "Corn", label: "Corn" }
	];

	const [intolerances, setIntolerances] = useState([]);
	const intoleranceOptions = [
		{ value: "no intolerances", label: "None" },
		{ value: "Dairy", label: "Dairy" },
		{ value: "Egg", label: "Eggs" },
		{ value: "Gluten", label: "Gluten" },
		{ value: "Grains", label: "Grains" },
		{ value: "Soy", label: "Soy" },
		{ value: "Wheat", label: "Wheat" },
		{ value: "Corn", label: "Corn" }
	];

	const [dietPreference, setDiets] = useState([]);
	const dietOptions = [
		{ value: "No Diet", label: "No Diet" },
		{ value: "Lacto Vegetarian", label: "Lacto Vegetarian" },
		{ value: "Ovo Vegetarian", label: "Ovo Vegetarian" },
		{ value: "Paleo", label: "Paleo" },
		{ value: "Primal", label: "Primal" },
		{ value: "Pescetarian", label: "Pescetarian" },
		{ value: "Vegan", label: "Vegan" },
		{ value: "Vegetarian", label: "Vegetarian" },
		{ value: "Ketogenic", label: "Ketogenic" },
		{ value: "Whole 30", label: "Whole 30" }
	];

	const [calorieIntake, setIntake] = useState("");
	const calorieIntakeOptions = [
		{ value: "Maintain Weight", label: "Maintain Weight" },
		{ value: "Calorie Deficit", label: "Calorie Deficit" },
		{ value: "Calorie Surplus", label: "Calorie Surplus" }
	];

	const [activityLevel, setActivityLevel] = useState("");
	const activityLevelOptions = [
		{ value: "None", label: "None" },
		{ value: "Low", label: "Low" },
		{ value: "Moderate", label: "Moderate" },
		{ value: "High", label: "High" }
	];

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("Diets selected:", dietPreference);
		console.log("allergies selected:", allergies);
		console.log("intolerances selected:", intolerances);

		if (dietPreference.length == 0 || calorieIntake === "") {
			alert("Please select a diet before proceeding.");
			return;
		}

		if (calorieIntake == "") {
			alert("Please select your Calorie Intake before proceding.");
			return;
		}

		axios
			.post(
				"http://ec2-3-12-104-199.us-east-2.compute.amazonaws.com:4000/signup",
				{
					restrictions: {
						allergies,
						intolerances,
						dietPreference,
						calorieIntake,
						age,
						weight,
						height,
						gender,
						activityLevel
					}
				}
			)
			.then((response) => {
				console.log("Response from server:", response.data);
				if (response.status === 200) {
					//access targetCalories directly from response.data
					const { targetCalories } = response.data;
					alert(
						`Based on your inputs, your target calorie intake is: ${targetCalories}`
					);

					//navigate to the dashboard with userID as a query parameter
					const userID = response.data.updatedUser._id;
					navigate(`/dashboard?userID=${userID}`, {
						state: { allergies, intolerances, dietPreference }
					});
				}
			})
			.catch((err) => {
				console.error("Error during diet preferences submission:", err);
				if (err.response) {
					alert(
						err.response.data.message || "Error saving restrictions"
					);
				}
			});
	};

	console.log("Current Calorie Intake:", calorieIntake);

	//return dropdown menu
	return (
		<div className="diet-container">
			<div className="diet-form-wrapper">
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
				</style>

				<div className="diet-title">
					<h2>
						<center>Enter Diet Preferences</center>
					</h2>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="diet-test">
						<span className="dd-title">
							<strong>Allergies</strong>
						</span>
						<Select
							isMulti
							className="dropdown"
							options={allergyOptions}
							onChange={(selectedOptions) =>
								setAllergies(
									selectedOptions.map(
										(option) => option.value
									)
								)
							}
						/>
					</div>

					<div className="diet-test">
						<span className="dd-title">
							<strong>Intolerances</strong>
						</span>
						<Select
							isMulti //enables multi-select
							className="dropdown"
							options={intoleranceOptions} //react-select will automatically create the options from this
							onChange={(selectedOptions) =>
								setIntolerances(
									selectedOptions.map(
										(option) => option.value
									)
								)
							}
						></Select>
					</div>

					<div className="diet-test">
						<span className="dd-title">
							<strong>Diets*</strong>
						</span>
						<Select
							className="dropdown"
							options={dietOptions} //react-select will automatically create the options from this
							onChange={(selectedOption) =>
								setDiets(selectedOption.value)
							}
						></Select>
					</div>

					<div className="diet-test">
						<span className="dd-title">
							<strong>Calorie Intake*</strong>
						</span>
						<Select
							className="dropdown"
							options={calorieIntakeOptions} //react-select will automatically create the options from this
							onChange={(selectedOption) =>
								setIntake(selectedOption.value)
							}
						></Select>
					</div>

					{(calorieIntake === "Calorie Deficit" ||
						calorieIntake === "Calorie Surplus") && (
						<>
							{/* Age */}
							<div className="diet-test">
								<span className="dd-title">
									<strong>Age*</strong>
								</span>
								<input
									className="diet-input-box"
									type="number"
									id="age"
									value={age}
									onChange={(e) => setAge(e.target.value)}
									placeholder="Enter your age"
									required
								/>
							</div>

							{/* Weight */}
							<div className="diet-test">
								<span className="dd-title">
									<strong>Weight* (lb)</strong>
								</span>
								<input
									className="diet-input-box"
									type="number"
									id="weight"
									value={weight}
									onChange={(e) => setWeight(e.target.value)}
									placeholder="Enter your weight"
									required
								/>
							</div>

							{/* Height */}
							<div className="diet-test">
								<span className="dd-title">
									<strong>Height* (inches)</strong>
								</span>
								<input
									className="diet-input-box"
									type="number"
									id="height"
									value={height}
									onChange={(e) => setHeight(e.target.value)}
									placeholder="Enter your height"
									required
								/>
							</div>

							{/* Gender */}
							<div className="diet-test">
								<span className="dd-title">
									<strong>Gender*</strong>
								</span>
								<div className="gender-options">
									<label>
										<input
											type="radio"
											name="gender"
											value="Male"
											onChange={() => setGender("Male")}
											checked={gender === "Male"}
											required
										/>
										Male
									</label>
									<label>
										<input
											type="radio"
											name="gender"
											value="Female"
											onChange={() => setGender("Female")}
											checked={gender === "Female"}
											required
										/>
										Female
									</label>
									<label>
										<input
											type="radio"
											name="gender"
											value="Other"
											onChange={() => setGender("Other")}
											checked={gender === "Other"}
											required
										/>
										Other
									</label>
								</div>
							</div>
							{/* Activity Level */}
							<div className="diet-test">
								<span className="dd-title">
									<strong>Activity Level*</strong>
								</span>
								<Select
									className="dropdown"
									options={activityLevelOptions}
									onChange={(selectedOption) =>
										setActivityLevel(selectedOption.value)
									}
									required
								/>
							</div>
						</>
					)}

					<div className="diet-btn">
						<SubmitButton />
						{}
					</div>
				</form>
			</div>
		</div>
	); //end return
} //end dietaryPreferences

{
	/* <div className="dropdown">
    <Multiselect 
        options={dietOptions}
        selectedValues={diets}
        onSelect={handleDietSelect}
        onRemove={handleDietRemove}
        displayValue="label"
        showCheckbox={true}
        required
    />
</div> */
}

{
	/* <div className="dropdown" style={{ fontFamily: 'Quicksand, sans-serif' }}>
    <Multiselect style={{ fontFamily: 'Quicksand, sans-serif' }}
        options={intoleranceOptions}
        selectedValues={intolerances}
        onSelect={handleIntoleranceSelect}
        onRemove={handleIntoleranceRemove}
        displayValue="label"
        showCheckbox={true}
    />
</div> */
}

{
	/* <select
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
    </select> */
}
