import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mealPlansSchema = new mongoose.Schema({
        userID: {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
        },

        mealName: [
                {
                        type: String,
                        required: true,
                },
        ],

        date: [
                {
                        type: Date,
                        required: true,
                },
        ],

        nutrition: [
                {
                        _id: false,
                        calories: {
                                type: Number,
                                required: true,
                        },
                        protein: {
                                type: Number,
                                required: true,
                        },
                        carbohydrates: {
                                type: Number,
                                required: true,
                        },
                        fat: {
                                type: Number,
                                required: true,
                        },
                },
        ],

        prepTime: [
                {
                        type: Number,
                        required: true,
                },
        ],

        ingredients: [
                {
                        type: [String],
                        required: true,
                },
        ],

        instructions: [
                {
                        type: String,
                        required: true,
                },
        ],
});

const MealPlans = mongoose.model("MealPlans", mealPlansSchema);
export default MealPlans;

//CREATE DUMMY ENTRY
// curl -X POST http://localhost:4000/mealPlansAndSchedule -H "Content-Type: application/json" -d '{
//         "userID": "671a7f512c73bb1693f21219",
//         "mealName": "Chicken and Rice",
//         "date": "2023-10-01T12:00:00Z",
//         "nutrition": {
//             "calories": 500,
//             "protein": 30,
//             "carbohydrates": 50,
//             "fat": 20
//         },
//         "prepTime": 30,
//         "ingredients": ["chicken", "rice", "broccoli"],
//         "instructions": "1. Cook the chicken. 2. Cook the rice. 3. Steam the broccoli. 4. Combine and serve.",
//     }'

//GET ALL ENTRIES
// curl -X GET http://localhost4000/mealPlans
