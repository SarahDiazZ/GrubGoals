const mongoose = require("mongoose");

const favoriteMeals = new mongoose.Schema({
        mealName: String,
        nutrition: {
                calories: Number,
                protein: Number,
                carbohydrates: Number,
                fat: Number,
        },
        prepTime: Number,
        ingredients: [String],
        instructions: String,
});

module.exports = mongoose.model("FavoriteMeals", favoriteMeals);

// curl -X POST http://localhost:3000/favoriteMeals -H "Content-Type: application/json" -d '{
//     "meal": "Peanut Butter and Jelly Sandwhich", "nutrition": {
//     "calories": 80, "protein": 30, "carbohydrates": 12, "fat": 2},
//     "prepTime": 2, "ingredients": ["bread", "extra-crunchy peanut butter", "grape jelly"],
//     "instructions": "1. Get two slices out \t 2. Spread Peanut Butter on one side of one slice of bread. \t 3. Spread Grape Jelly on one side of one slide of bread \t 4. Press both slices together and enjoy"
//     }'
