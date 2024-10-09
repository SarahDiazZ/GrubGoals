import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restrictionsSchema = new mongoose.Schema ({
    allergies: [{
        type: String, 
        enum: ['Peanuts', 'Tree Nuts', 'Shellfish', 'Fish', 'Eggs', 'Milk', 'Soy', 'Wheat', 'Gluten'],
        required: false
      }],
      intolerances: [{
        type: String, 
        enum: ['Lactose', 'Gluten', 'Fructose', 'Histamine', 'Caffeine'],
        required: false
      }],
});

const restrictions = mongoose.model('restrictions', restrictionsSchema);
export default restrictions;