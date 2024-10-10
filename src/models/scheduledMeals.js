import mongoose from "mongoose";

const scheduledMealsSchema = new mongoose.Schema({
        mealID: String,
        date: Date,
});

const ScheduledMeals = mongoose.model("ScheduledMeals", scheduledMealsSchema);
export default ScheduledMeals;

//CREATED ENTRY
// curl -X POST http://localhost:3000/scheduledMeals -H "Content-Type: application/json" -d '{ "mealID": "PB&J", "date": "2023-10-01T12:00:00Z"}'

//GET ALL ENTRIES
// curl -X GET http://localhost:3000/scheduledMeals
