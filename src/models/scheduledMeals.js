import mongoose from "mongoose";
const Schema = mongoose.Schema;

const scheduledMealsSchema = new mongoose.Schema({
        userID: {
                type: Schema.Types.ObjectId,
                ref: "user",
                required: true,
        },
        // maybe use spoonacular ID for this 
        mealID: [
                {
                        type: Schema.Types.ObjectId,
                        ref: "mealPlan",
                        required: true,
                },
        ],
        // see react-big-calendar RAW data https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/additional-examples-layout--events-on-a-constrained-day-column
        
        date: [
                {
                        type: Date,
                        required: true,
                },
        ],
});

const ScheduledMeals = mongoose.model("ScheduledMeals", scheduledMealsSchema);
export default ScheduledMeals;

//CREATED ENTRY
// curl -X POST http://localhost:3000/scheduledMeals -H "Content-Type: application/json" -d '{ "mealID": "PB&J", "date": "2023-10-01T12:00:00Z"}'

//GET ALL ENTRIES
// curl -X GET http://localhost:3000/scheduledMeals

// SCHEDULE MEAL FROM FAVORITEMEALS
// curl -X POST http://localhost:4000/scheduleMealFromFavoritedMeals -H "Content-Type: application/json" -d '{
//         "userID": "671a7f512c73bb1693f21219",
//         "mealID": "672a981cf6c363c2267dc49a",
//         "date": "2023-10-01T12:00:00Z"
//     }'
