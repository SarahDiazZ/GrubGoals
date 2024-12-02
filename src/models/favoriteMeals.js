import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favoriteMealsSchema = new mongoose.Schema({
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

        nutrition: [
                {
                        _id: false,
                        calories: {
                                type: Number,
                                required: true,
                        },
                        cholesterol: {
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

const FavoriteMeals = mongoose.model("FavoriteMeals", favoriteMealsSchema);
export default FavoriteMeals;

//CREATE DUMMY ENTRY
// curl -X POST http://localhost:4000/favoriteMeals -H "Content-Type: application/json" -d '{
//         "userID": "671a7f512c73bb1693f21219",
//         "mealName": "Peanut Butter and Jelly Sandwich",
//         "nutrition": {
//             "calories": 80,
//             "protein": 30,
//             "carbohydrates": 12,
//             "fat": 2
//         },
//         "prepTime": 2,
//         "ingredients": ["bread", "extra-crunchy peanut butter", "grape jelly"],
//         "instructions": "1. Get two slices out \t 2. Spread Peanut Butter on one side of one slice of bread. \t 3. Spread Grape Jelly on one side of one slice of bread \t 4. Press both slices together and enjoy"
//     }'

//GET ALL ENTRIES
// curl -X GET http://localhost:4000/favoriteMeals
