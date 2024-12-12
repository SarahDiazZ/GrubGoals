import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useDarkMode } from '../context/DarkModeContext';
import SettingsNavBar from "../components/SettingsNavBar";
import Select from "react-select";
import '../css/SettingsPage.css'
import 'animate.css'


export default function SettingsPage() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const location = useLocation(); // Access the location object
    const queryParams = new URLSearchParams(location.search); // Parse query params
    const userId = queryParams.get("userID"); // Get the userID from the query string

    const [username, setUsername] = useState("");
    const [newUsername, setNewUsername] = useState(""); // For new username input
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [diet, setDiet] = useState([]);
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
		{ value: "Whole 30", label: "Whole 30" },
	];

    const [allergies, setAllergies] = useState([])
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
		{ value: "Corn", label: "Corn" },
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
		{ value: "Corn", label: "Corn" },
	];

    const [calorieIntake, setIntake] = useState("");
	const calorieIntakeOptions = [
		{ value: "Maintain Weight", label: "Maintain Weight" },
		{ value: "Calorie Deficit", label: "Calorie Deficit" },
		{ value: "Calorie Surplus", label: "Calorie Surplus" },
	];

    const [activityLevel, setActivityLevel] = useState("");
	const activityLevelOptions = [
		{ value: "None", label: "None" },
		{ value: "Low", label: "Low" },
		{ value: "Moderate", label: "Moderate" },
		{ value: "High", label: "High" },
	];

    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("");
    const [activeSection, setActiveSection] = useState("Account");

    // Fetch user data on mount
    useEffect(() => {
            const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/user/${userId}`);
                setUsername(data.userName);
                setEmail(data.email);
                setDiet(data.dietaryPreferences?.diet || []);
                setAllergies(data.dietaryPreferences?.allergies || []);
                setIntolerances(data.dietaryPreferences?.intolerances || []);
                setIntake(data.calorieIntake?.[0] || "Maintain Weight");
                setAge(data.age || "");
                setWeight(data.weight || "");
                setHeight(data.height || "");
                setGender(data.gender || "");
                setActivityLevel(data.activityLevel || "None");
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleAccountSave = async (e) => {
        e.preventDefault();
        const updatedUsername = newUsername.trim() || username; //use newUsername if provided; otherwise, keep current username
        try {
            await axios.put(`http://localhost:4000/settings/account`, { 
                userId,
                username: updatedUsername, //send updated or current username 
                email
            });
            if (newUsername.trim()) {
                setUsername(newUsername); //update current username state only if a new one was provided
                setNewUsername(""); //clear the new username input
            }

            alert("Account settings updated successfully!");
        } 
        catch (err) {
            console.error("Error updating account settings:", err);
        }
    };

    const handlePasswordChange = async (e) => {
        if (!newPassword || !confirmPassword) {
            alert('Please fill out all password fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Your passwords don't match");
            return;
        }

        if (newPassword.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        try {
            await axios.put(`http://localhost:4000/settings/password`, {
                userId,
                currentPassword,
                newPassword,
            });
            alert("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Please check your current password.");
        }
    };

    const handleDietSave = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/settings/diet`, {
                userId,
                dietPreferences: diet,
                allergies: allergies,
                intolerances: intolerances,
            });
            alert("Dietary preferences updated successfully!");
        } catch (err) {
            console.error("Error updating dietary preferences:", err);
        }
    };

    const handleCalorieSave = async (e) => {
        e.preventDefault();      

        if (
            (calorieIntake === "Calorie Deficit" || calorieIntake === "Calorie Surplus") &&
            (!age || !weight || !height || !gender || !activityLevel)
        ) {
            alert("Please fill out all required fields for calorie calculations.");
            return;
        }

        try {
            await axios.put(`http://localhost:4000/settings/calorieintake`, {
                userId,
                calorieIntake: [calorieIntake], // Send as array to match schema
                age,
                weight,
                height,
                gender,
                activityLevel,
            });
            alert("Calorie intake and activity level updated successfully!");
        } catch (err) {
            console.error("Error updating calorie intake and activity level:", err);
        }
    };



    return (
        <div className={`settings-page ${isDarkMode ? 'dark' : ''}`}>
            <div className={`settings-main-container ${isDarkMode ? 'dark' : ''}`}>
                <div className='settings-overlay-box animate__animated animate__fadeIn'>
                    <SettingsNavBar 
                        activeSection={activeSection}
                        onSelectSection={setActiveSection}
                        isDarkMode={isDarkMode} 
                        toggleDarkMode={toggleDarkMode}
                    />
                    <div className='right-overlay animate__animated animate__fadeInRight'>
                        <div className="settings-text">
                            <h1>Settings</h1>
                        </div>
                        <div className="settings-section">
                            {activeSection == "Account" && (
                                <>
                                    <h2>Account Settings</h2>
                                        <form onSubmit={handleAccountSave} className="account-settings-form">
                                            <div className="settings-left-section">
                                                <label htmlFor="username">Current Username</label>
                                                <input
                                                    type="text"
                                                    id="current-username"
                                                    value={username} //displays the current username
                                                    readOnly //makes it uneditable
                                                />
                                                <label htmlFor="new-username">Change Username</label>
                                                <input
                                                    type="text"
                                                    id="new-username"
                                                    value={newUsername} //tracks the optional new username
                                                    onChange={(e) => setNewUsername(e.target.value)} //updates new username
                                                    placeholder="Enter new username (optional)"
                                                />
                                                
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    id="current-email"
                                                    value={email} //displays current email
                                                    readOnly //makes it uneditable
                                                />
                                                <button className="settings-button" type="submit">Change Username</button>
                                            </div>
                                        </form>

                                        <form onSubmit={handlePasswordChange} className="password-change-form">
                                            <div className="settings-right-section">
                                                {/* <h4>Change Password</h4> */}
                                                <label htmlFor="current-password">Current Password</label>
                                                <input
                                                    type="password"
                                                    id="current-password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    placeholder="Enter your current password"
                                                    required
                                                />
                                                <label htmlFor="new-password">New Password</label>
                                                <input
                                                    type="password"
                                                    id="new-password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter your new password"
                                                    required
                                                />
                                                <label htmlFor="confirm-password">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    id="confirm-password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirm your new password"
                                                    required
                                                />
                                                <button className="settings-button" type="button" onClick={handlePasswordChange}>Change Password</button>
                                            </div>

                                        </form>
                                </>
                            )}  
                            
                            {/* Dietary Preferences */}
                            {activeSection == "Dietary Preferences" && (
                                <>
                                    <h2>Dietary Preferences</h2>
                                    <form onSubmit={handleDietSave}>
                                        <label htmlFor="diet">Diet Type</label>
                                        <Select
                                            className={isDarkMode ? "dropdown-dark" : "dropdown-light"}
                                            classNamePrefix="dropdown"
                                            options={dietOptions} //react-select will automatically create the options from this
                                            onChange={(selectedOption) =>
                                                setDiet(selectedOption.value)
                                            }
                                        />
                                        <label htmlFor="allergies">Allergies</label>
                                        <Select
                                            isMulti
                                            className={isDarkMode ? "dropdown-dark" : "dropdown-light"}
                                            classNamePrefix="dropdown"
                                            options={allergyOptions}
                                            onChange={(selectedOptions) =>
                                                setAllergies(
                                                    selectedOptions.map(
                                                        (option) => option.value
                                                    )
                                                )
                                            }
                                        />
                                        <label htmlFor="intolerances">Intolerances</label>
                                        <Select
                                            isMulti //enables multi-select
                                            className={isDarkMode ? "dropdown-dark" : "dropdown-light"}
                                            classNamePrefix="dropdown"
                                            options={intoleranceOptions} //react-select will automatically create the options from this
                                            onChange={(selectedOptions) =>
                                                setIntolerances(
                                                    selectedOptions.map(
                                                        (option) => option.value
                                                    )
                                                )
                                            }
                                        />
                                        <button className="settings-button" type="submit">Save Preferences</button>
                                    </form>
                                </>
                            )}
                                

                            {/* Activity Level */}
                            {activeSection == "Calorie Intake" && (
                                <>
                                    <h2>Activity Level</h2>
                                    <form onSubmit={handleCalorieSave}>
                                        <label htmlFor="activity">Select Calorie Intake</label>
                                        <Select
                                            className={isDarkMode ? "dropdown-dark" : "dropdown-light"}
                                            classNamePrefix="dropdown"
                                            options={calorieIntakeOptions} //react-select will automatically create the options from this
                                            onChange={(selectedOption) =>
                                            setIntake(selectedOption.value)
                                            }
                                        />
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
                                                        className={isDarkMode ? "dropdown-dark" : "dropdown-light"}
                                                        classNamePrefix="dropdown"
                                                        options={activityLevelOptions}
                                                        onChange={(selectedOption) =>
                                                            setActivityLevel(selectedOption.value)
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <button className="settings-button" type="submit">Update Activity Level</button>
                                    </form>
                                </>
                            )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}; //end SettingsPage function