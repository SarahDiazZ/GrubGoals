import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restrictionsSchema = new mongoose.Schema({
        allergies: [
                {
                        type: String,
                        required: false,
                },
        ],
        intolerances: [
                {
                        type: String,
                        required: false,
                },
        ],
        dietPreferences: [
                {
                        type: String,
                        required: true //If no dietPref, then user must select "No Diet"
                },
        ],
        calorieIntake: [
                {
                        type: String,
                        required: true
                },
        ],
        age: {
                type: Number,
                default: null
        },
        weight: {
                type: Number,
                default: null,
                required: false
        },
        height: {
                type: Number,
                default: null,
                required: false
        },
        gender: {
                type: String,
                default: null,
                required: false
        },
        activityLevel: {
                type: String,
                default: null,
                required: false
        },
});

const DietaryRestrictions = mongoose.model("restrictions", restrictionsSchema);
export default DietaryRestrictions;