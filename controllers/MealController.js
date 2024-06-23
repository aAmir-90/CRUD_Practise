import Meal from "../models/MealModel.js";

export const addMeal = async (req, res) => {
  const { name, taste, price } = req.body;
  try {
    const newMeal = new Meal({ name, taste, price });
    const response = await newMeal.save();
    res.status(200).json({
      success: true,
      message: "Meal Created successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Meals Not Found",
    });
  }
};

export const getMeals = async (req, res) => {
  try {
    const allMeals = await Meal.find();
    if (!allMeals) {
      return res.status(404).json({
        success: true,
        message: "Meals Not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meals fetch succefully",
      allMeals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to fetch meal",
    });
  }
};

export const updateMeals = async (req, res) => {
  try {
    const mealId = req.params.id;
    const response = await Meal.findByIdAndUpdate(mealId, req.body, {
      new: true,
    });
    if (!response) {
      return res.status(401).json({
        success: true,
        message: "Meal not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Update Meal Successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update Meal",
    });
  }
};

export const deleteMeals = async (req, res) => {
  try {
    const mealId = req.params.id;
    const response = await Meal.findByIdAndDelete(mealId);
    if (!response) {
      return res.status(401).json({
        success: true,
        message: "Meals not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Meals deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Meals",
    });
  }
};

export const getMealById = async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (
      tasteType === "Sweet" ||
      tasteType === "Spicy" ||
      tasteType === "Sour"
    ) {
      const response = await Meal.find({ taste: tasteType });
      res.status(200).json({
        success: true,
        message: "Get Meal by ID",
        response,
      });
    } else {
      res.status(401).json({
        success: true,
        message: "Internal server error",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find by ID",
    });
  }
};
