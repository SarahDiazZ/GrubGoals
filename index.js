import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersInformation from "./src/models/UsersInformation.js";
import scheduledMeals from "./src/models/ScheduledMeals.js";
import mealPlans from "./src/models/MealPlans.js";
import favoriteMeals from "./src/models/FavoriteMeals.js";
import dietaryRestrictions from "./src/models/DietaryRestrictions.js";

//node index.js
//new terminal: Run curl commands

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Needed to connect to MongoDB
mongoose.connect("mongodb://localhost:27017/GrubGoals")
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
});

// Route to create new user
app.post("/users", (req, res) => {
        const user = new UsersInformation({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                dietaryPreferences: req.body.dietaryPreferences,
                fitnessGoals: req.body.fitnessGoals,
        });

        user.save()
                .then((newUser) => {
                        res.json(newUser);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

// Route to get all users
app.get("/users", (req, res) => {
        usersInformation
                .find()
                .then((users) => {
                        res.json(users);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to favorite a meal
app.post("/FavoriteMeals", (req, res) => {
        const faveMeal = new favoriteMeals({
                meal: req.body.meal,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                nutrition: req.body.nutrition,
                prepTime: req.body.prepTime,
        });

        faveMeal.save()
                .then((newMeal) => {
                        res.json(newMeal);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to get all favorite meals
app.get("/FavoriteMeals", (req, res) => {
        favoriteMeals
                .find()
                .then((meals) => {
                        res.json(meals);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to schedule meals
app.post("/ScheduledMeals", (req, res) => {
        const schedmeals = new scheduledMeals({
                mealID: req.body.mealID,
                date: req.body.date,
        });

        schedmeals
                .save()
                .then((newMeal) => {
                        res.json(newMeal);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to get all scheduled meals
app.get("/ScheduledMeals", (req, res) => {
        scheduledMeals
                .find()
                .then((meals) => {
                        res.json(meals);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to create a meal plan
app.post("/MealPlans", (req, res) => {
        const plan = new mealPlans({
                mealID: req.body.mealID,
                date: req.body.date,
                nutrition: req.body.nutrition,
                ingredients: req.body.ingredients,
        });

        plan.save()
                .then((newPlan) => {
                        res.json(newPlan);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to get all meal plans
app.get("/MealPlans", (req, res) => {
        mealPlans
                .find()
                .then((plans) => {
                        res.json(plans);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

app.post("/DietaryRestrictions", (req, res) => {
        const restrictions = new dietaryRestrictions({
                allergies: req.body.allergies,
                intolerances: req.body.intolerances,
        });

        restrictions
                .save()
                .then((newRestriction) => {
                        res.json(newRestriction);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

app.get("/DietaryRestrictions", (req, res) => {
        dietaryRestrictions
                .find()
                .then((restrictions) => {
                        res.json(restrictions);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});
