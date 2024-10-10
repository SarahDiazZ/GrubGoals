const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Imports models (Collections we will be using)
const userInformation = require("./models/UsersInformation");
const scheduledMeals = require("./models/ScheduledMeals");
const mealPlans = require("./models/MealPlans");
const favoriteMeals = require("./models/FavoriteMeals");

app.use(express.json());

// Needed to connect to MongoDB
mongoose.connect("mongodb://localhost:27017/GrubGoals")
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));

// Testing to define a route
app.get("/", (req, res) => {
        res.send("Hello, world!");
});

app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
});

//POST termina entry
// curl -X POST http://localhost:3000/favoriteMeals -H "Content-Type: application/json" -d '{

// Route to create new user
app.post("/users", (req, res) => {
        const user = new userInformation({
                name: req.body.name,
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
        userInformation
                .find()
                .then((users) => {
                        res.json(users);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});

//Route to favorite a meal
app.post("/favoriteMeals", (req, res) => {
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
app.get("/favoriteMeals", (req, res) => {
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
app.post("/scheduledMeals", (req, res) => {
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
app.get("/scheduledMeals", (req, res) => {
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
app.post("/mealPlans", (req, res) => {
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
app.get("/mealPlans", (req, res) => {
        mealPlans
                .find()
                .then((plans) => {
                        res.json(plans);
                })
                .catch((err) => {
                        res.status(400).json({ error: err });
                });
});
