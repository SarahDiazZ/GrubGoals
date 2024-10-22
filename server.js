import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import { createServer } from "node:http";
import { join } from "node:path";

// const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
// import { searchRecipeTest } from '../SpoonacularAPI/recipes';
import userModel from "./src/models/UsersInformation.js";
import { all } from "axios";
import DietaryRestrictions from "./src/models/DietaryRestrictions.js";

const PORT = 4000;
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

async function main() {
        await mongoose.connect("mongodb://127.0.0.1:27017/grubgoals");
}

main()
        .then(function () {
                console.log("Mongoose connected!");
        })
        .catch((err) => console.log(err));

app.post("/login", (req, res) => {
        const { userName, password } = req.body;
        userModel
                .findOne({ userName: userName })
                .then((user) => {
                        if (user) {
                                if (user.validPass(password)) {
                                        res.json("Success");
                                } else {
                                        res.json("The password is incorrect");
                                }
                        } else {
                                res.json("No record existed");
                        }
                })
                .catch((err) => {
                        console.log("Error finding user:", err);
                        res.status(500).json("Error during login");
                });
});

//TODO: add regex and password minimum
app.post("/signup", async (req, res) => {
        // console.log("Register request body:", req.body); //log the request body

        const { firstName, lastName, userName, email, password, confirmedPassword } = req.body;

        //Minimum 8 characters {8,}, at least one uppercase, symbol, and number
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])/; 
        const passwordLength = /^.{8,}$/

        const userEmailFound = await userModel.findOne({email});

        //check if email already exists
        if (userEmailFound != null) {
                return res.status(400).json({ error: "Email already in use" });
        }

        //check if passwords match
        if (password !== confirmedPassword) {
                return res.status(400).json({ error: "Passwords do not match" });
        }

                //check if password meets regex requirements
        if (!passwordRegex.test(password)) {
                return res.status(400).json({ error: "Password does not meet requirements." });
        }

        if (!passwordLength.test(password)) {
                return res.status(400).json({ error: "Password must be at least 8 characters long." });
        }

                

        //if all checks pass, create the new user
        const newUser = new userModel({ firstName, lastName, userName, email });
        newUser.setPass(password); //hash password using setPass method

        newUser.save()
                .then(user => {
                        res.status(200).json({ success: true, user }); //send success response
                })
                .catch(err => {
                        console.log("Error creating user:", err);
                        res.status(500).json({ error: "Internal server error" });
                });

});

app.post("/dietpreferences", (req, res) => {
        const { allergies, intolerances, dietPreferences, calorieIntake } = req.body;

        const newDietRestrictions = new DietaryRestrictions({ allergies, intolerances, dietPreferences, calorieIntake });

        newDietRestrictions.save()
                        .then((restrictions) => res.json(restrictions))
                        .catch((err) => {
                                console.log("Error adding restrictions");
                                res.status(400).json(err)
                        })
});

app.post("/dietpreferences", (req, res) => {
        const { allergies, intolerances, dietPreferences, calorieIntake } = req.body;

        const newDietRestrictions = new DietaryRestrictions({ allergies, intolerances, dietPreferences, calorieIntake });

        newDietRestrictions.save()
                        .then((restrictions) => res.json(restrictions))
                        .catch((err) => {
                                console.log("Error adding restrictions");
                                res.status(400).json(err)
                        })
});

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
});
