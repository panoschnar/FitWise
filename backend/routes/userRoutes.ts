// routes/userRouter.ts
import { Router } from "express";
import { validate } from "../middleware/validate";
import { User as UserSchema } from "../validations/userValidation";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

// Get all users
router.get("/", getUsers);

// Get user by ID
router.get("/:id", getUser);

// Create a new user with validation
router.post("/", validate(UserSchema), createUser);

// Update user by ID with validation (partial allowed)
router.put("/:id", validate(UserSchema.partial()), updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

export default router;
