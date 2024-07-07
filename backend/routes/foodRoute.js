import express from "express";
import multer from "multer";
import { listFood, addFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image storage engine configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: Endpoints for managing food items
 */

/**
 * @swagger
 * /food/add:
 *   post:
 *     summary: Add a new food item
 *     tags: [Food]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: The name of the food item
 *         required: true
 *       - in: formData
 *         name: description
 *         type: string
 *         description: The description of the food item
 *         required: true
 *       - in: formData
 *         name: price
 *         type: number
 *         description: The price of the food item
 *         required: true
 *       - in: formData
 *         name: category
 *         type: string
 *         description: The category of the food item
 *         required: true
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image of the food item
 *         required: true
 *     responses:
 *       200:
 *         description: Food item added successfully
 *       400:
 *         description: Bad request
 */
foodRouter.post("/food/add", upload.single("image"), addFood);

/**
 * @swagger
 * /food/list:
 *   get:
 *     summary: List all food items
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: List of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The food ID
 *                   name:
 *                     type: string
 *                     description: The name of the food item
 *                   description:
 *                     type: string
 *                     description: The description of the food item
 *                   imageUrl:
 *                     type: string
 *                     description: The URL of the food image
 *       500:
 *         description: Server error
 */
foodRouter.get("/food/list", listFood);

/**
 * @swagger
 * /food/delete/{id}:
 *   delete:
 *     summary: Delete a food item by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The food ID
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Server error
 */
foodRouter.delete("/food/delete/:id", removeFood);

export default foodRouter;
