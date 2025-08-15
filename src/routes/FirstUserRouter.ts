import { Router } from "express";
import { FirstUserController } from "../controllers/FirstUserController";

const router = Router();

router.post("/register-first", FirstUserController.createWithCompany);

export default router;
