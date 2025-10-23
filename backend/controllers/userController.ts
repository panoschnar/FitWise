// controllers/userController.ts
import { Request, Response } from "express";
import { prisma } from "../utils/prismaClient";
import { AppError } from "../middleware/errorHandler";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { metrics: true, preferences: true, goals: true, myPlans: true },
  });
  res.json({ success: true, data: users });
});

// Get user by ID
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      metrics: true,
      preferences: true,
      goals: true,
      myPlans: true,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  res.json({ success: true, data: user });
});

// Create user (hash password)
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new AppError("Email already in use", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  res.status(201).json({ success: true, data: user });
});

// Update user by ID
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    metrics,
    preferences,
    goals,
    gender,
    height,
    birthDate,
    ...userData
  } = req.body;
  //  Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { id },
    include: { metrics: true, preferences: true, goals: true },
  });

  if (!existingUser) throw new AppError("User not found", 404);
  console.log(birthDate);
  let parsedBirthDate: Date | null = null;
  if (birthDate) {
    const date = new Date(birthDate);
    if (!isNaN(date.getTime())) {
      parsedBirthDate = date;
    }
  }
  //  Prepare update payload
  const updateData: any = {
    ...userData,
    gender,
    height,
    birthDate: parsedBirthDate,
  };

  //  Handle metrics (array of related records)
  if (metrics && Array.isArray(metrics)) {
    updateData.metrics = {
      upsert: metrics.map((m: any) => ({
        where: { id: m.id || "" },
        create: {
          weight: m.weight,
          bodyFat: m.bodyFat ?? null,
        },
        update: {
          weight: m.weight,
          bodyFat: m.bodyFat ?? null,
        },
      })),
    };
  }

  //  Handle preferences (one-to-one)
  if (preferences) {
    updateData.preferences = {
      upsert: {
        where: { id: preferences.id || "" },
        create: {
          dietType: preferences.dietType,
          allergies: preferences.allergies ?? [],
          dislikes: preferences.dislikes ?? [],
          workoutStyle: preferences.workoutStyle ?? [],
        },
        update: {
          dietType: preferences.dietType,
          allergies: preferences.allergies ?? [],
          dislikes: preferences.dislikes ?? [],
          workoutStyle: preferences.workoutStyle ?? [],
        },
      },
    };
  }

  //  Handle goals (one-to-one)
  if (goals) {
    updateData.goals = {
      upsert: {
        where: { userId: id },
        create: {
          goalType: goals.goalType,
          targetWeight: goals.targetWeight,
          weeklyChange: goals.weeklyChange ?? null,
        },
        update: {
          goalType: goals.goalType,
          targetWeight: goals.targetWeight,
          weeklyChange: goals.weeklyChange ?? null,
        },
      },
    };
  }

  //  Execute update
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    include: { metrics: true, preferences: true, goals: true, myPlans: true },
  });

  // Respond
  res.json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Add a new metric for a user
export const addMetric = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params; // Pass userId in the route
  const { weight, bodyFat } = req.body;

  if (!weight) throw new AppError("Weight is required", 400);

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("User not found", 404);

  // Create metric
  const metric = await prisma.metric.create({
    data: {
      weight,
      bodyFat: bodyFat ?? null,
      user: { connect: { id: userId } },
    },
  });

  res.status(201).json({
    success: true,
    message: "Metric added successfully",
    data: metric,
  });
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

//  Login user
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new AppError("Email and password are required", 400);

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      metrics: true,
      preferences: true,
      goals: true,
    },
  });
  if (!user) throw new AppError("Invalid credentials", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid credentials", 401);

  const responseData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    metrics: !!user.metrics.length,
    preferences: !!user.preferences,
    goals: !!user.goals,
  };

  res.json({
    success: true,
    message: "Login successful",
    data: responseData,
  });
});
