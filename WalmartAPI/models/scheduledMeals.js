const mongoose = require("mongoose");

const scheduledMeals = new mongoose.Schema({
        mealID: String,
        date: Date,
});

module.exports = mongoose.model("ScheduledMeals", scheduledMeals);

// curl -X POST http://localhost:3000/scheduledMeals -H "Content-Type: application/json" -d '{ "mealID": "PB&J", "date": "2023-10-01T12:00:00Z"}'
