// controllers/userController.ts
import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { AppError } from "../middleware/errorHandler";
import { asyncHandler } from "../utils/asyncHandler";

// Get all users
export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { metrics: true, preferences: true, goals: true, dietPlans: true },
  });
  res.json({ success: true, data: users });
});

// Get user by ID
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: { metrics: true, preferences: true, goals: true, dietPlans: true },
  });

  if (!user) throw new AppError("User not found", 404);

  res.json({ success: true, data: user });
});

// Create a new user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  // Prisma validation will also catch missing password, name, email
  const user = await prisma.user.create({
    data: { name, email, password, role },
    include: { metrics: true, preferences: true, goals: true, dietPlans: true },
  });

  res.status(201).json({ success: true, data: user });
});

// Update user by ID
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  // Check if user exists first
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError("User not found", 404);

  const user = await prisma.user.update({
    where: { id },
    data,
    include: { metrics: true, preferences: true, goals: true, dietPlans: true },
  });

  res.json({ success: true, data: user });
});

// Delete user by ID
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if user exists first
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError("User not found", 404);

  await prisma.user.delete({ where: { id } });

  res.json({ success: true, message: "User deleted" });
});
