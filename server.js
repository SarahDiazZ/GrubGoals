import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import crypto from "crypto";
import { createServer } from "node:http";
import { join } from "node:path";

// const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
// import { searchRecipeTest } from '../SpoonacularAPI/recipes';
import userModel from "./src/models/UsersInformation.js";
import dietaryPreferences from "./src/pages/DietaryPrefPage.js";
import { all } from "axios";

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

app.post("/signup", (req, res) => {
        console.log("Register request body:", req.body); //log the request body

        const { firstName, lastName, userName, email, password } = req.body;

        const newUser = new userModel({ firstName, lastName, userName, email });
        newUser.setPass(password); //hash password using setPass method

        newUser.save()
                .then((user) => res.json(user))
                .catch((err) => {
                        console.log("Error creating user:", err);
                        res.status(400).json(err);
                });
});

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!`);
});
