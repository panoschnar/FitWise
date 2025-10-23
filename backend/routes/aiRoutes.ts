import { Router } from "express";
import { generateAndSavePlan } from "../controllers/aiController";

const router = Router();

router.post("/generate", generateAndSavePlan);

export default router;
