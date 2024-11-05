import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restrictionsSchema = new mongoose.Schema({
        userID: {
                type: Schema.Types.ObjectId,
                ref: "user",
        },

        allergies: [
                {
                        type: String,
                        required: false,
                },
        ],
        intolerances: [
                {
                        type: String,
                        required: false,
                },
        ],
        dietPreferences: [
                {
                        type: String,
                        required: true, //If no dietPref, then user must select "No Diet"
                },
        ],
        calorieIntake: [
                {
                        type: String,
                        required: true,
                },
        ],
        age: {
                type: Number,
                default: null,
        },
        weight: {
                type: Number,
                default: null,
                required: false,
        },
        height: {
                type: Number,
                default: null,
                required: false,
        },
        gender: {
                type: String,
                default: null,
                required: false,
        },
        activityLevel: {
                type: String,
                default: null,
                required: false,
        },
        //new fields for BMI calculations and calorie adjustments
        bmr: {
                type: Number,
                default: null,
        },
        tdee: {
                type: Number,
                default: null,
        },
        targetCalories: {
                type: Number,
                default: null,
        },
});

//BMI and calorie calculation functions
function calculateBMR(weight, height, age, gender) {
        if (gender === "male") {
                return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
                return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
        }
} //end calculateBMR

function calculateTDEE(bmr, activityLevel) {
        const activityMultipliers = {
                None: 1.2,
                Low: 1.375,
                Moderate: 1.55,
                High: 1.725,
        };
        return bmr * (activityMultipliers[activityLevel] || 1.2); //default to 1.2 if undefined
} //end calculateTDEE

function adjustCalories(tdee, goal) {
        if (goal === "deficit") {
                return tdee - 500; //adjust based on desired deficit
        } else if (goal === "surplus") {
                return tdee + 250; //adjust based on desired surplus
        }
        return tdee; // Default to maintenance
} //end adjustCalories

//pre-save hook to calculate BMR, TDEE, and target calories
restrictionsSchema.pre("save", function (next) {
        if (
                this.weight &&
                this.height &&
                this.age &&
                this.gender &&
                this.activityLevel
        ) {
                const bmr = calculateBMR(
                        this.weight,
                        this.height,
                        this.age,
                        this.gender
                );
                this.bmr = bmr;
                this.tdee = calculateTDEE(bmr, this.activityLevel);

                //assuming `goal` is a string field in your request specifying 'deficit' or 'surplus'
                this.targetCalories = adjustCalories(
                        this.tdee,
                        this.calorieIntake[0]
                ); //use the first item as goal
        }
        next();
});

const restrictions = mongoose.model("restrictions", restrictionsSchema);
export default restrictions;
