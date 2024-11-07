import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import { createServer } from "node:http";
import { join } from "node:path";

global.userID;

// const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
// import { searchRecipeTest } from '../SpoonacularAPI/recipes';
// import { all } from "axios";
import user from "./src/models/UsersInformation.js";
import restrictions from "./src/models/DietaryRestrictions.js";
import FavoriteMeals from "./src/models/favoriteMeals.js";
import ScheduledMeals from "./src/models/scheduledMeals.js";
import MealPlans from "./src/models/mealPlans.js";

const PORT = 4000;
const app = express();
const server = createServer(app);

//Minimum 8 characters {8,}, at least one uppercase, symbol, and number
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])/;
const passwordLength = /^.{8,}$/;

app.use(express.json());
app.use(cors());

async function main() {
        try {
                //connect to MongoDB
                await mongoose.connect("mongodb://127.0.0.1:27017/grubgoals");
                console.log("Mongoose connected!");

                //start server after setting up routes
                app.listen(PORT, () => {
                        console.log(`Server is running on port ${PORT}!`);
                });
        } catch (err) {
                console.error("Error during server setup:", err); //catch connection errors
        }
}

//call main to initialize server and handle errors in main
main();

app.post("/login", async (req, res) => {
        const { userName, password } = req.body.user;

        try {
                const foundUser = await user.findOne({ userName });
                if (!foundUser) {
                        return res.status(404).send("User not found");
                }

                // we found a user here, so save the userID
                global.userID = foundUser._id.toString();
                const userID = global.userID;

                if (foundUser.validPass(password)) {
                        console.log("Login successful");
                        res.json({ success: true, userID });
                } else {
                        console.log("Wrong password");
                        res.status(401).json({ error: "Wrong password" });
                }
        } catch (error) {
                //end try
                console.error(error);
                res.status(500).json({ error: "Server error" });
        } //end catch
}); //end user login api

app.post("/signup", async (req, res) => {
        const {
                firstName,
                lastName,
                userName,
                email,
                password,
                confirmedPassword,
        } = req.body.user;
        const userEmailFound = await user.findOne({ email });

        if (userEmailFound != null) {
                return res.status(400).json({ error: "Email already in use" });
        }

        if (password !== confirmedPassword) {
                return res
                        .status(400)
                        .json({ error: "Passwords do not match" });
        }

        if (!passwordRegex.test(password)) {
                return res.status(400).json({
                        error: "Password does not meet requirements.",
                });
        }

        if (!passwordLength.test(password)) {
                return res.status(400).json({
                        error: "Password must be at least 8 characters long.",
                });
        }

        const newID = new mongoose.Types.ObjectId(); // KEEP THIS SETTING HERE. needed for global.userID
        global.userID = newID;

        const newUser = new user({
                _id: newID,
                firstName,
                lastName,
                userName,
                email,
                password,
                confirmedPassword,
        });

        newUser.setPass(password);

        try {
                await newUser.save();

                const newRestrictions = new restrictions({
                        userID: newUser._id,
                        allergies: [],
                        intolerances: [],
                        dietPreferences: [],
                        calorieIntake: [],
                        age: null,
                        weight: null,
                        height: null,
                        gender: null,
                        activityLevel: null,
                });

                await newRestrictions.save();

                res.status(201).json({
                        message: "User registered successfully",
                        userID: newUser._id,
                });
        } catch (err) {
                console.error("Failed to add new user:", err);
                res.status(400).json({ message: "Failed to add new user" });
        }
});

app.get('/logout', (req, res) => {
    console.log('Logged out successfully.');
    res.redirect('/dashboard');
});

app.post("/dietpreferences", async (req, res) => {
        const {
                allergies,
                intolerances,
                dietPreferences,
                calorieIntake,
                age,
                weight,
                height,
                gender,
                activityLevel,
        } = req.body.restrictions;
        const userID = global.userID;

        console.log("restrictions", userID);

        try {
                function calculateBMR(weight, height, age, gender) {
                        if (gender === "Male") {
                                return (
                                        88.362 +
                                        13.397 * weight +
                                        4.799 * height -
                                        5.677 * age
                                );
                        } else {
                                return (
                                        447.593 +
                                        9.247 * weight +
                                        3.098 * height -
                                        4.33 * age
                                );
                        }
                } //end calculateBMR

                function calculateTDEE(bmr, activityLevel) {
                        const activityMultipliers = {
                                None: 1.2,
                                Low: 1.375,
                                Moderate: 1.55,
                                High: 1.725,
                        };
                        return (
                                bmr *
                                (activityMultipliers[activityLevel] || 1.2)
                        );
                } //end calculateTDEE

                function adjustCalories(tdee, goal) {
                        if (goal === "Calorie Deficit") {
                                return tdee - 500; //500 calorie deficit
                        } else if (goal === "Calorie Surplus") {
                                return tdee + 250; //250-alorie surplus
                        }
                        return tdee; //maintenance
                } //end adjustCalories

                //convert height from inches to centimeters and weight from pounds to kilograms for calculation
                const weightInKg = weight * 0.453592;
                const heightInCm = height * 2.54;

                //calculate BMR, TDEE, and targetCalories
                const bmr = calculateBMR(weightInKg, heightInCm, age, gender);
                const tdee = calculateTDEE(bmr, activityLevel);
                const targetCalories = adjustCalories(
                        tdee,
                        calorieIntake
                ).toFixed(2);

                let userRestrictions = await restrictions.findOneAndUpdate(
                        { userID },
                        {
                                allergies,
                                intolerances,
                                dietPreferences,
                                calorieIntake,
                                age,
                                weight,
                                height,
                                gender,
                                activityLevel,
                                bmr,
                                tdee,
                                targetCalories,
                        },
                        { new: true, upsert: true } //upsert option creates the document if it doesn’t exist
                );

                await user.findByIdAndUpdate(userID, {
                        dietaryPreferences: userRestrictions._id,
                });

                const updatedUser = await user.findById(userID);

                console.log("Restrictions saved successfully.");
                res.status(200).json({
                        message: "Restrictions saved successfully",
                        updatedUser,
                        targetCalories,
                });
        } catch (err) {
                console.error("Error saving restrictions:", err);
                res.status(500).json({
                        error: "Server error while saving restrictions",
                });
        }
});

app.get("/user/:id", async (req, res) => {
        try {
                let foundUser = await user.findById(req.params.id);

                if (!foundUser) {
                        return res
                                .status(404)
                                .json({ error: "User not found" });
                }

                if (foundUser.dietaryPreferences) {
                        const dietaryPreferencesData =
                                await restrictions.findById(
                                        foundUser.dietaryPreferences
                                );
                        console.log("---->", dietaryPreferencesData);
                        foundUser.dietaryPreferences = dietaryPreferencesData;
                }

                res.json(foundUser);
        } catch (err) {
                console.error("Error fetching user data:", err);
                res.status(500).json({
                        error: "Server error while fetching user data",
                });
        }
});

app.post("/favoriteMeals", async (req, res) => {
        const {
                userID,
                mealName,
                nutrition,
                prepTime,
                ingredients,
                instructions,
        } = req.body;

        const newFavoriteMeal = new FavoriteMeals({
                userID,
                mealName,
                nutrition,
                prepTime,
                ingredients,
                instructions,
        });

        try {
                const savedMeal = await newFavoriteMeal.save();
                res.status(201).json({
                        message: "Favorite meal added successfully",
                        savedMeal,
                });
        } catch (err) {
                console.error("Failed to add new favorite meal:", err);
                res.status(400).json({
                        message: "Failed to add new favorite meal",
                });
        }
});

app.post("/mealPlansAndSchedule", async (req, res) => {
        const {
                userID,
                mealName,
                date,
                nutrition,
                prepTime,
                ingredients,
                instructions,
        } = req.body;

        const newMealPlan = new MealPlans({
                userID,
                mealName,
                date,
                nutrition,
                prepTime,
                ingredients,
                instructions,
        });

        try {
                const savedMealPlan = await newMealPlan.save();

                const newScheduledMeal = new ScheduledMeals({
                        userID,
                        mealID: savedMealPlan._id,
                        date,
                });

                const savedScheduledMeal = await newScheduledMeal.save();

                res.status(201).json({
                        message: "Meal plan and scheduled meals added successfully",
                        savedMealPlan,
                        savedScheduledMeal,
                });
        } catch (err) {
                console.error("Failed to add new meal plan:", err);
                res.status(400).json({
                        message: "Failed to add new meal plan",
                });
        }
});

app.post("/scheduleMealFromFavoritedMeals", async (req, res) => {
        try {
                const favoritedMeals = await FavoriteMeals.findById(
                        req.body.mealID
                );
                if (!favoritedMeals) {
                        return res
                                .status(404)
                                .json({ error: "Meal plan not found" });
                }

                const scheduledMeal = new ScheduledMeals({
                        userID: req.body.userID,
                        mealID: req.body.mealID,
                        date: req.body.date,
                });

                const newScheduledMeal = await scheduledMeal.save();
                res.status(201).json({
                        message: "Scheduled meal added successfully",
                        newScheduledMeal,
                });
        } catch (err) {
                console.error("Failed to add new meal plan:", err);
                res.status(400).json({
                        message: "Failed to add new meal plan",
                });
        }
});
