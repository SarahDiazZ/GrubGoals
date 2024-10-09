import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'node:http';
import { join } from 'node:path';
const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
import {searchRecipeTest} from '../SpoonacularAPI/recipes';
const PORT = 5173;
const app = express();
const server = createServer(app);

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/grubgoals");
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

import userModel from './src/models/user.js';