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
});

const DietaryRestrictions = mongoose.model("restrictions", restrictionsSchema);
export default DietaryRestrictions;