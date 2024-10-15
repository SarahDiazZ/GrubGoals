import { type } from "express/lib/response";
import mongoose from "mongoose";
import dietaryPreferences from "../pages/DietaryPrefPage";
const Schema = mongoose.Schema;

const restrictionsSchema = new mongoose.Schema({
        allergies: [
                {
                        type: String,
                        enum: [
                                "Eggs",
                                "Peanut",
                                "Grains",
                                "Peanuts",
                                "Seafood",
                                "Sesame",
                                "Shellfish",
                                "Soy",
                                "Tree Nuts",
                                "Wheat",
                                "Corn",

                        ],
                        required: false,
                },
        ],
        intolerances: [
                {
                        type: String,
                        enum: [
                                "Dairy",
                                "Eggs",
                                "Gluten",
                                "Grains",
                                "Soy",
                                "Wheat",
                                "Corn",

                        ],
                        required: false,
                },
        ],
        dietPreferences: [
                {
                        type: String,
                        enum: [
                                "No Diet",
                                "Lacto Vegetarian", //includes dairy but excludes meat, fish, poultry, and eggs
                                "Ovo Vegetarian", //includes eggs but excludes all other animal products
                                "Paleo",
                                "Primal", //high protein, low-carb eating pattern based on the idea that humans should eat like hunter-gatherers
                                "Pescetarian",
                                "Vegan",
                                "Vegetarian",
                                "Ketogenic",
                                "Whole 30", //avoids foods that cause inflamation or irritation in your body
                        ],
                        required: false
                },
        ],
});

const DietaryRestrictions = mongoose.model("restrictions", restrictionsSchema);
export default DietaryRestrictions;
// const restrictions = mongoose.model("restrictions", restrictionsSchema);
// export default restrictions;

//CREATED ENTRY
// curl -X POST http://localhost:3000/DietaryRestrictions -H "Content-Type: application/json" -d '{
//         "allergies": ["Peanuts", "Gluten"],
//         "intolerances": ["Lactose", "Caffeine"]
//     }'
// {"allergies":["Peanuts","Gluten"],"intolerances":["Lactose","Caffeine"],"_id":"6707fbaa019242ed1f9a4f74","__v":0}%

//GET ALL ENTRIES
// curl -X GET http://localhost:3000/DietaryRestrictions
