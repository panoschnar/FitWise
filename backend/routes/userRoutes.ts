// routes/userRouter.ts
import { Router } from "express";
import { validate } from "../middleware/validate";
import { LoginSchema, RegisterSchema, User as UserSchema } from "../validations/userValidation";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  addMetric,
} from "../controllers/userController";

const router = Router();

// Login user
router.post("/login", validate(LoginSchema), loginUser);

// Get all users
router.get("/", getUsers);

// Get user by ID
router.get("/:id", getUser);

// Create a new user with validation
router.post("/register", validate(RegisterSchema), createUser);

// Update user by ID with validation (partial allowed)
router.put("/:id", validate(UserSchema.partial()), updateUser);

// Add new metrics for the user by Id
router.post("/:userId/metrics", addMetric);

// Delete user by ID
router.delete("/:id", deleteUser);

export default router;
