import express from "express";
const router = express.Router();
import { addMeal, getMeals, updateMeals, deleteMeals, getMealById } from "../controllers/MealController.js";


router.post("/add-meals", addMeal);
router.get("/get-meals", getMeals);
router.put("/update-meals/:id", updateMeals)
router.delete("/delete-meals/:id", deleteMeals)
router.get("/get-meals/:tasteType", getMealById)

export default router;