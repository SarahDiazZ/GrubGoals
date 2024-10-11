import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
        },
        lastName: {
                type: String,
                required: true,
        },
        userName: {
                type: String,
                required: true,
        },
        email: {
                type: String,
                required: true,
        },
        restrictions: [{ type: String }],

        hash: String,
        salt: String, //adds random data to pw

        dietaryPreferences: {
                restrictions: [String],
                allergies: [String],
                preferences: [String],
        },
        fitnessGoals: [String],

        //this might be needed after when implementing the settings DB. I forgot tho
        // settings: {
        //     type: Schema.Types.ObjectId,
        //     ref:
        // }
});

//Start of Login info hashing
userSchema.methods.setPass = function (password) {
        this.salt = crypto.randomBytes(16).toString("hex");

        //Hash user's salt and password with 1000 iterations,
        this.hash = crypto
                .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
                .toString(`hex`);
};

//method to check if password entered was correct
userSchema.methods.validPass = function (password) {
        let hash = crypto
                .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
                .toString(`hex`);
        return this.hash === hash;
};

// Provides all objects from user database
userSchema.statics.listAllUsers = function () {
        return this.find({});
};

const UsersInformation = mongoose.model("UsersInformation", userSchema);
export default UsersInformation;

//CREATE DUMMY ENTRY
// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
//         "firstName": "John",
//         "lastName": "Doe",
//         "userName": "johndoe",
//         "email": "john.doe@example.com",
//         "dietaryPreferences": {
//             "restrictions": ["gluten-free"],
//             "allergies": ["peanuts"],
//             "preferences": ["vegetarian"]
//         },
//         "fitnessGoals": ["lose weight", "build muscle"]
//     }'

//GET ALL USERS
// curl -X GET http://localhost:3000/users
