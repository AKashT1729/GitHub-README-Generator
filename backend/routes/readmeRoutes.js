import express from "express";
const router = express.Router();
import readmeController from "../controllers/readmeController.js";

// Route to generate README
router.post('/generate-readme', readmeController.generateReadme);

module.exports = router;
