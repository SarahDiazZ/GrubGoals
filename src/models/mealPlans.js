const mongoose = require("mongoose");

const mealPlans = new mongoose.Schema({
        mealID: String,
        date: Date,
        nutrition: {
                calories: Number,
                protein: Number,
                carbohydrates: Number,
                fat: Number,
        },
        ingredients: [String],
});

module.exports = mongoose.model("MealPlans", mealPlans);

// curl -X POST http://localhost:3000/mealPlans -H "Content-Type: application/json" -d '{
//         "mealID": "12345",
//         "date": "2023-10-01T12:00:00Z",
//         "nutrition": {
//             "calories": 500,
//             "protein": 30,
//             "carbohydrates": 50,
//             "fat": 20
//         },
//         "ingredients": ["chicken", "rice", "broccoli"]
//     }'
