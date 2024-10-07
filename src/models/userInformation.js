const mongoose = require("mongoose");

const userInformation = new mongoose.Schema({
        name: String,
        email: String,
        dietaryPreferences: {
                restrictions: [String],
                allergies: [String],
                preferences: [String],
        },
        fitnessGoals: [String],
});

module.exports = mongoose.model("UserInformation", userInformation, "users");

// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
//         "name": "John Doe",
//         "email": "john.doe@example.com",
//         "dietaryPreferences": {
//             "restrictions": ["gluten-free"],
//             "allergies": ["peanuts"],
//             "preferences": ["vegetarian"]
//         },
//         "fitnessGoals": ["lose weight", "build muscle"]
//     }'
