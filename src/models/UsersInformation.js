import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";
// import { type } from "os";
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

        hash: String,
        salt: String, //adds random data to pw

        restrictions: [{ type: String }],

        dietaryPreferences: {
                allergies: [String],
                intolerances: [String],
                dietPreferences: [String],
                calorieIntake: [String],
        },
        age: {
                type: Number
        },
        weight: {
                type: Number
        },
        height: {
                type: Number
        },
        gender: {
                type: String
        },
        activityLevel: {
                type: String
        },

        // this might be needed after when implementing the settings DB. I forgot tho
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

const userModel = mongoose.model('user', userSchema);
export default userModel;
