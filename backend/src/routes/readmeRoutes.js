import {Router} from 'express'
import readmeController from "../controllers/readmeController.js";
const router = Router();
// Route to generate README
router.route('/generate-readme').post(readmeController)

export default router;
