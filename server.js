import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import { createServer } from "node:http";
import { join } from "node:path";
import passport from "passport";
import session from "express-session";
import "./auth.js";

global.userID;

// import { searchRecipeTest } from '../SpoonacularAPI/recipes';
import user from "./src/models/UsersInformation.js";
import restrictions from "./src/models/DietaryRestrictions.js";
import FavoriteMeals from "./src/models/favoriteMeals.js";
import ScheduledMeals from "./src/models/scheduledMeals.js";
import MealPlans from "./src/models/mealPlans.js";
// import user from "./src/models/UsersInformation.js";

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);

//Minimum 8 characters {8,}, at least one uppercase, symbol, and number
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])/;
const passwordLength = /^.{8,}$/;

app.use(express.json());
app.use(cors());
app.use(
	session({
		secret: "cats",
		resave: false,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session());

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

//Google OAuth 2.0
function isLoggedIn(req, res, next) {
	req.user ? next() : res.sendStatus(401);
}

app.get("/google", (req, res) => {
	res.send('<a href="/auth/google">Login with Google</a>');
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/protected",
		failureRedirect: "/auth/failure"
	})
);

app.get("/protected", isLoggedIn, async (req, res) => {
	try {
		const email = req.user.emails[0].value;
		const existingUser = await user.findOne({ email: email });
		if (existingUser) {
			global.userID = existingUser._id;
			res.redirect(`/dashboard?userID=${existingUser._id}`);
			return;
		}

		const names = req.user.displayName.split(" ");
		const newID = new mongoose.Types.ObjectId(); // KEEP THIS SETTING HERE. needed for global.
		global.userID = newID;

		const newUser = new user({
			_id: newID,
			firstName: names[0],
			lastName: names[1],
			userName: req.user.displayName,
			email: email
		});

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
			activityLevel: null
		});

		await newRestrictions.save();

		res.redirect(`/dietpreferences?userID=${newUser._id}`);
	} catch (err) {
		console.error("Failed to add new user:", err);
		if (!res.headersSent) {
			res.status(500).json({ message: "Internal server error" });
		}
	}
});

app.get("/auth/failure", (req, res) => {
	res.send("Failed to authenticate..");
});

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
		confirmedPassword
	} = req.body.user;
	const validEmailDomains = [
		"gmail.com",
		"yahoo.com",
		"hotmail.com",
		"aol.com",
		"outlook.com",
		"icloud.com",
		"proton.com",
		"mail.com",
		"zoho.com"
	];
	const emailDomain = email.split("@")[1];

	if (!validEmailDomains.includes(emailDomain)) {
		return res.status(400).json({
			error: "Invalid email domain. Please use a valid email domain."
		});
	}

	const userEmailFound = await user.findOne({ email });

	if (userEmailFound != null) {
		return res.status(400).json({ error: "Email already in use" });
	}

	if (password !== confirmedPassword) {
		return res.status(400).json({ error: "Passwords do not match" });
	}

	if (!passwordRegex.test(password)) {
		return res.status(400).json({
			error: "Password does not meet requirements."
		});
	}

	if (!passwordLength.test(password)) {
		return res.status(400).json({
			error: "Password must be at least 8 characters long."
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
		confirmedPassword
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
			activityLevel: null
		});

		await newRestrictions.save();

		res.status(201).json({
			message: "User registered successfully",
			userID: newUser._id
		});
	} catch (err) {
		console.error("Failed to add new user:", err);
		res.status(400).json({ message: "Failed to add new user" });
	}
});

// i dont think we need this
// app.get('/logout', (req, res) => {
//     console.log('Logged out successfully.');
//     res.redirect('/dashboard');
// });

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
		activityLevel
	} = req.body.restrictions;
	const userID = global.userID;

	console.log("restrictions", userID);

	try {
		function calculateBMR(weight, height, age, gender) {
			if (gender === "Male") {
				return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
			} else {
				return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
			}
		} //end calculateBMR

		function calculateTDEE(bmr, activityLevel) {
			const activityMultipliers = {
				None: 1.2,
				Low: 1.375,
				Moderate: 1.55,
				High: 1.725
			};
			return bmr * (activityMultipliers[activityLevel] || 1.2);
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
		const targetCalories = adjustCalories(tdee, calorieIntake).toFixed(2);

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
				targetCalories
			},
			{ new: true, upsert: true } //upsert option creates the document if it doesn’t exist
		);

		await user.findByIdAndUpdate(userID, {
			dietaryPreferences: userRestrictions._id
		});

		const updatedUser = await user.findById(userID);

		console.log("Restrictions saved successfully.");
		res.status(200).json({
			message: "Restrictions saved successfully",
			updatedUser,
			targetCalories
		});
	} catch (err) {
		console.error("Error saving restrictions:", err);
		res.status(500).json({
			error: "Server error while saving restrictions"
		});
	}
});

app.get("/user/:id", async (req, res) => {
	try {
		let foundUser = await user.findById(req.params.id);

		if (!foundUser) {
			return res.status(404).json({ error: "User not found" });
		}

		if (foundUser.dietaryPreferences) {
			const dietaryPreferencesData = await restrictions.findById(
				foundUser.dietaryPreferences
			);
			console.log("---->", dietaryPreferencesData);
			foundUser.dietaryPreferences = dietaryPreferencesData;
		}

		res.json(foundUser);
	} catch (err) {
		console.error("Error fetching user data:", err);
		res.status(500).json({
			error: "Server error while fetching user data"
		});
	}
});

app.post("/favoriteMeals", async (req, res) => {
	const { userID, mealID, mealImage, mealName, nutrition, prepTime, ingredients, instructions } = req.body;


	try {
		// first check if the meal we're about to add already exists
		const existingMeal = await FavoriteMeals.findOne({userID, mealID});
		if (existingMeal){
			return res.status(409).json({
				message: "This recipe/meal is already in favorites"
			});
		}

		const newFavoriteMeal = new FavoriteMeals({
			userID,
			mealID,
			mealImage,
			mealName,
			nutrition,
			prepTime,
			ingredients,
			instructions
		});

		const savedMeal = await newFavoriteMeal.save();
		res.status(201).json({
			message: "Favorite meal added successfully",
			savedMeal
		});
	} catch (err) {
		console.error("Failed to add new favorite meal:", err);
		res.status(400).json({
			message: "Failed to add new favorite meal"
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
		instructions
	} = req.body;

	const newMealPlan = new MealPlans({
		userID,
		mealName,
		date,
		nutrition,
		prepTime,
		ingredients,
		instructions
	});

	try {
		const savedMealPlan = await newMealPlan.save();

		const newScheduledMeal = new ScheduledMeals({
			userID,
			mealID: savedMealPlan._id,
			date
		});

		const savedScheduledMeal = await newScheduledMeal.save();

		res.status(201).json({
			message: "Meal plan and scheduled meals added successfully",
			savedMealPlan,
			savedScheduledMeal
		});
	} catch (err) {
		console.error("Failed to add new meal plan:", err);
		res.status(400).json({
			message: "Failed to add new meal plan"
		});
	}
});

app.post("/scheduleMealFromFavoritedMeals", async (req, res) => {
	try {
		const favoritedMeals = await FavoriteMeals.findById(req.body.mealID);
		if (!favoritedMeals) {
			return res.status(404).json({ error: "Meal plan not found" });
		}

		const scheduledMeal = new ScheduledMeals({
			userID: req.body.userID,
			mealID: req.body.mealID,
			date: req.body.date
		});

		const newScheduledMeal = await scheduledMeal.save();
		res.status(201).json({
			message: "Scheduled meal added successfully",
			newScheduledMeal
		});
	} catch (err) {
		console.error("Failed to add new meal plan:", err);
		res.status(400).json({
			message: "Failed to add new meal plan"
		});
	}
});


// Update account settings
app.put("/settings/account", async (req, res) => {
    const { userId, username, email } = req.body;

    if (!userId || !username) {
        return res.status(400).json({ error: "User ID and username are required." });
    }

    try {
        // Ensure the username is unique
        const existingUser = await user.findOne({ userName: username });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(409).json({ error: "Username is already taken." });
        }

        const updatedUser = await user.findByIdAndUpdate(
            userId,
            { userName: username, email }, // Update username and email
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "Account settings updated successfully.",
            updatedUser,
        });
    } catch (err) {
        console.error("Error updating account settings:", err);
        res.status(500).json({ error: "Failed to update account settings." });
    }
});

app.put("/settings/password", async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const foundUser = await user.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found." });
        }

        // Verify current password
        if (!foundUser.validPass(currentPassword)) {
            return res.status(401).json({ error: "Incorrect current password." });
        }

        // Validate new password
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                error: "New password does not meet security requirements.",
            });
        }

        // Update with new password
        foundUser.setPass(newPassword);
        await foundUser.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (err) {
        console.error("Error updating password:", err);
        res.status(500).json({ error: "Failed to update password." });
    }
});

app.put("/settings/diet", async (req, res) => {
    const { userId, dietPreferences, allergies, intolerances } = req.body;

    try {
        const restriction = await restrictions.findOne({ userID: userId });

        if (!restriction) {
            return res.status(404).json({ message: "User restrictions not found." });
        }

        // Only update the fields that are provided
        if (dietPreferences) {
            restriction.dietPreferences = dietPreferences;
        }
        if (allergies) {
            restriction.allergies = allergies;
        }
        if (intolerances) {
            restriction.intolerances = intolerances;
        }

        // Save the updated document
        await restriction.save();

        res.status(200).json({ message: "Dietary preferences updated successfully." });
    } catch (err) {
        console.error("Error updating dietary preferences:", err);
        res.status(500).json({ message: "Failed to update dietary preferences." });
    }
});


app.put("/settings/calorieintake", async (req, res) => {
    const { userId, weight, height, age, gender, activityLevel, calorieIntake } = req.body;

    try {
        // Validate inputs
        // if (!userId || !weight || !height || !age || !gender || !activityLevel || !calorieIntake) {
        //     return res.status(400).json({ message: "All fields are required." });
        // }

		function calculateBMR(weight, height, age, gender) {
			if (gender === "Male") {
				return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
			} else {
				return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
			}
		} //end calculateBMR

		function calculateTDEE(bmr, activityLevel) {
			const activityMultipliers = {
				None: 1.2,
				Low: 1.375,
				Moderate: 1.55,
				High: 1.725
			};
			return bmr * (activityMultipliers[activityLevel] || 1.2);
		} //end calculateTDEE

		function adjustCalories(tdee, goal) {
			if (goal === "Calorie Deficit") {
				return tdee - 500; //500 calorie deficit
			} else if (goal === "Calorie Surplus") {
				return tdee + 250; //250-alorie surplus
			}
			return tdee; //maintenance
		} //end adjustCalories

        // Convert weight and height
        const weightInKg = weight * 0.453592;
        const heightInCm = height * 2.54;

        // Perform calculations
        const bmr = calculateBMR(weightInKg, heightInCm, age, gender);
        const tdee = calculateTDEE(bmr, activityLevel);
        const targetCalories = adjustCalories(tdee, calorieIntake).toFixed(2);

        // Find and update user's restriction document
        const restriction = await restrictions.findOne({ userID: userId });

        if (!restriction) {
            return res.status(404).json({ message: "User restrictions not found." });
        }


		restriction.weight = weight;
		restriction.height = height;
		restriction.age = age;
		restriction.gender = gender;
		restriction.activityLevel = activityLevel;
		restriction.calorieIntake = calorieIntake;
        restriction.bmr = bmr;
        restriction.tdee = tdee;
        restriction.targetCalories = targetCalories;


        // Save updated restriction
        await restriction.save();

        res.status(200).json({
            message: "Dietary preferences updated successfully.",
            bmr,
            tdee,
            targetCalories,
        });
    } catch (error) {
        console.error("Error updating dietary preferences:", error);
        res.status(500).json({ message: "Failed to update dietary preferences." });
    }
});

// schedule meal from recipes page and such
app.post("/scheduleMeal", async (req, res) => {
	const {userID, mealName, date, startTime, endTime, nutrition} = req.body;

	try{
		console.log("Incoming data:", req.body)

		// validation things
		if (!userID || !mealName || !date || !startTime || !endTime){
			return res.status(400).json({error: "Missing required fields"});
		}

		// check if this meal is already scheduled
		const existingMeal = await ScheduledMeals.findOne({userID, mealName, date, startTime, endTime});
		if (existingMeal){
			return res.status(409).json({error: "This meal has already been scheduled"}); 
		}


		const newScheduledMeal = new ScheduledMeals({
			userID,
			mealName,
			date,
			startTime,
			endTime,
			nutrition
		});

		const scheduledMeal = await newScheduledMeal.save();
		
		res.status(201).json({
			message: "Successfully scheduled meal",
			scheduledMeal
		});

	}catch(err){
		console.error("Error scheduling meal...", err);
		res.status(400).json({error: "Failed to schedule meal"})
	}
})

// get method for scheduled meals
// needed to fetch from the DB
app.get("/getScheduledMeals", async (req, res) =>{
	const {userID} = req.query
	console.log("SERVER (fetching scheduled meals): found userID... ", userID)

	try{
		// attempt to fetch the meals
		console.log("SERVER: attempting to fetch meals for: ", userID)
		const meals = await ScheduledMeals.find({userID});
		//console.log("SERVER: fetched meals -> " + meals)

		res.status(200).json(meals);
	}catch(err){
		console.error("SERVER.JS: Error fetching scheduled meals... ", err);
		res.status(500).json({error: "Server failed to fetch scheduled meals..."})
	}
})

// get method for fetching favorited meals
app.get("/getFavorites", async (req, res) => {
	const {userID} = req.query;
	console.log("SERVER (fetching favorites): found userID... ", userID);

	try{
		console.log("SERVER: attempting to fetch favorited meals for: ", userID);
		const meals = await FavoriteMeals.find({userID});
		//console.log("SERVER: fetched favorite meals -> " + meals);

		res.status(200).json(meals)
	}catch(err){
		console.error("SERVER.JS: Error fetching favorited meals... ", err);
		res.status(500).json({error: "Server failed to fetch favorited meals..."})
	}
})

// get method to get user's recommended (calulated) calorie intake
app.get("/getIntakeData", async (req, res) => {
	const {userID} = req.query;
	console.log("SERVER (fetching intake data): found userID... ", userID)

	try{
		console.log("SERVER: attempting to fetch intake data for: ", userID)
		const intake = await restrictions.findOne({userID});

		res.status(200).json(intake)
	}catch(err){
		console.error("SERVER.JS: Error fetching intake data... ", err);
		res.status(500).json({error: "Server failed to fetch intake data"})
	}
})