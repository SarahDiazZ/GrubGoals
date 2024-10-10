import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restrictionsSchema = new mongoose.Schema({
        allergies: [
                {
                        type: String,
                        enum: [
                                "Peanuts",
                                "Tree Nuts",
                                "Shellfish",
                                "Fish",
                                "Eggs",
                                "Milk",
                                "Soy",
                                "Wheat",
                                "Gluten",
                        ],
                        required: false,
                },
        ],
        intolerances: [
                {
                        type: String,
                        enum: [
                                "Lactose",
                                "Gluten",
                                "Fructose",
                                "Histamine",
                                "Caffeine",
                        ],
                        required: false,
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
