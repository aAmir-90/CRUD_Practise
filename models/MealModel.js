import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    taste: {
        type: String,
        enum: ["Sweet", "Spicy", "Sour"],
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
},{timestamps: true})


const Meal = mongoose.model("Meal", mealSchema)
export default Meal
