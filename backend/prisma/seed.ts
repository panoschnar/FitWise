import { PrismaClient, Role, Gender, WorkoutType, GoalType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Alice
  await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "alice@example.com",
      role: Role.USER,
      gender: Gender.FEMALE,
      height: 165,
      birthDate: new Date("1995-05-15"),
      metrics: {
        create: [
          { weight: 70, bodyFat: 30 },
          { weight: 68, bodyFat: 28 },
        ],
      },
      preferences: {
        create: {
          dietType: "omnivore",
          allergies: ["peanuts", "gluten"],
          dislikes: ["broccoli"],
          workoutStyle: [WorkoutType.CROSS_TRAINING, WorkoutType.YOGA],
        },
      },
      goals: {
        create: {
          goalType: GoalType.LOSE,
          targetWeight: 60,
          weeklyChange: 0.5,
        },
      },
      myPlans: {
        create: [
          {
           dietPlan: [
        {
          day: "Monday",
          meals: [
            { name: "Breakfast", item: "Oats + berries", grams: 50, calories: 200, protein: 6, carbs: 35, fats: 4 },
            { name: "Snack", item: "Greek yogurt", grams: 150, calories: 120, protein: 10, carbs: 8, fats: 5 },
            { name: "Lunch", item: "Grilled chicken + quinoa", grams: 200, calories: 400, protein: 35, carbs: 40, fats: 10 },
            { name: "Snack2", item: "Protein shake", grams: 30, calories: 120, protein: 25, carbs: 3, fats: 2 },
            { name: "Dinner", item: "Salmon + broccoli", grams: 180, calories: 350, protein: 30, carbs: 20, fats: 15 },
          ],
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Breakfast", item: "Scrambled eggs + avocado toast", grams: 150, calories: 300, protein: 15, carbs: 25, fats: 15 },
            { name: "Snack", item: "Apple + peanut butter", grams: 100, calories: 180, protein: 4, carbs: 22, fats: 9 },
            { name: "Lunch", item: "Turkey wrap + salad", grams: 200, calories: 350, protein: 30, carbs: 35, fats: 10 },
            { name: "Snack2", item: "Mixed nuts", grams: 30, calories: 170, protein: 5, carbs: 6, fats: 15 },
            { name: "Dinner", item: "Steak + sweet potato", grams: 200, calories: 450, protein: 35, carbs: 40, fats: 20 },
          ],
        },
        {
          day: "Wednesday",
          meals: [
            { name: "Breakfast", item: "Smoothie bowl", grams: 200, calories: 250, protein: 6, carbs: 40, fats: 8 },
            { name: "Snack", item: "Rice cakes + hummus", grams: 60, calories: 150, protein: 4, carbs: 25, fats: 5 },
            { name: "Lunch", item: "Tuna salad", grams: 180, calories: 350, protein: 30, carbs: 15, fats: 20 },
            { name: "Snack2", item: "Protein bar", grams: 50, calories: 200, protein: 20, carbs: 20, fats: 6 },
            { name: "Dinner", item: "Pasta + chicken", grams: 200, calories: 400, protein: 30, carbs: 50, fats: 10 },
          ],
        },
        {
          day: "Thursday",
          meals: [
            { name: "Breakfast", item: "Chia pudding", grams: 150, calories: 220, protein: 6, carbs: 25, fats: 10 },
            { name: "Snack", item: "Boiled eggs", grams: 100, calories: 150, protein: 12, carbs: 1, fats: 10 },
            { name: "Lunch", item: "Veggie stir-fry + tofu", grams: 200, calories: 350, protein: 20, carbs: 35, fats: 15 },
            { name: "Snack2", item: "Fruit salad", grams: 150, calories: 120, protein: 2, carbs: 30, fats: 0 },
            { name: "Dinner", item: "Fish tacos", grams: 180, calories: 380, protein: 30, carbs: 35, fats: 12 },
          ],
        },
        {
          day: "Friday",
          meals: [
            { name: "Breakfast", item: "Avocado toast + poached eggs", grams: 150, calories: 300, protein: 12, carbs: 28, fats: 18 },
            { name: "Snack", item: "Trail mix", grams: 40, calories: 200, protein: 5, carbs: 15, fats: 15 },
            { name: "Lunch", item: "Grilled salmon + asparagus", grams: 200, calories: 400, protein: 35, carbs: 10, fats: 20 },
            { name: "Snack2", item: "Cottage cheese", grams: 100, calories: 100, protein: 12, carbs: 4, fats: 4 },
            { name: "Dinner", item: "Chicken curry + rice", grams: 220, calories: 450, protein: 30, carbs: 50, fats: 15 },
          ],
        },
        {
          day: "Saturday",
          meals: [
            { name: "Breakfast", item: "Banana pancakes", grams: 150, calories: 300, protein: 8, carbs: 45, fats: 8 },
            { name: "Snack", item: "Smoothie", grams: 200, calories: 180, protein: 5, carbs: 35, fats: 2 },
            { name: "Lunch", item: "Buddha bowl", grams: 250, calories: 400, protein: 15, carbs: 50, fats: 15 },
            { name: "Snack2", item: "Popcorn", grams: 50, calories: 120, protein: 3, carbs: 25, fats: 2 },
            { name: "Dinner", item: "BBQ chicken wings + salad", grams: 200, calories: 450, protein: 35, carbs: 20, fats: 25 },
          ],
        },
        {
          day: "Sunday",
          meals: [
            { name: "Breakfast", item: "French toast + strawberries", grams: 150, calories: 300, protein: 10, carbs: 40, fats: 10 },
            { name: "Snack", item: "Yogurt parfait", grams: 150, calories: 150, protein: 8, carbs: 20, fats: 5 },
            { name: "Lunch", item: "Burger (lean beef) + sweet potato fries", grams: 220, calories: 500, protein: 30, carbs: 45, fats: 25 },
            { name: "Snack2", item: "Protein shake", grams: 30, calories: 120, protein: 25, carbs: 3, fats: 2 },
            { name: "Dinner", item: "Roast beef + veggies", grams: 200, calories: 400, protein: 35, carbs: 20, fats: 15 },
          ],
        },
      ],
            exercisePlan: [
              { day: "Monday", exercises: [{ name: "Squats", type: "STRENGTH", sets: 3, reps: 12 }, { name: "Running", type: "CARDIO", durationMin: 20 }], restDay: false },
              { day: "Tuesday", exercises: [{ name: "Push-ups", type: "STRENGTH", sets: 3, reps: 15 }, { name: "Yoga Flow", type: "YOGA", durationMin: 30 }], restDay: false },
              { day: "Wednesday", exercises: [{ name: "Deadlifts", type: "STRENGTH", sets: 3, reps: 10 }, { name: "Cycling", type: "CARDIO", durationMin: 25 }], restDay: false },
              { day: "Thursday", exercises: [{ name: "Pilates", type: "PILATES", durationMin: 40 }], restDay: false },
              { day: "Friday", exercises: [{ name: "Bench Press", type: "STRENGTH", sets: 3, reps: 12 }, { name: "Rowing", type: "CARDIO", durationMin: 20 }], restDay: false },
              { day: "Saturday", exercises: [], restDay: true },
              { day: "Sunday", exercises: [{ name: "Swimming", type: "CARDIO", durationMin: 30 }], restDay: false },
            ],
            nutritionSummary: [
              { day: "Monday", calories: 2200, protein: 150, carbs: 250, fats: 70 },
              { day: "Tuesday", calories: 2150, protein: 140, carbs: 260, fats: 65 },
              { day: "Wednesday", calories: 2250, protein: 155, carbs: 240, fats: 72 },
              { day: "Thursday", calories: 2100, protein: 130, carbs: 250, fats: 68 },
              { day: "Friday", calories: 2300, protein: 160, carbs: 260, fats: 75 },
              { day: "Saturday", calories: 2350, protein: 155, carbs: 270, fats: 80 },
              { day: "Sunday", calories: 2250, protein: 150, carbs: 260, fats: 72 },
            ],
          },
        ],
      },
    },
  });

  // Bob
  await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "bob@example.com",
      role: Role.USER,
      gender: Gender.MALE,
      height: 178,
      birthDate: new Date("1988-09-22"),
      metrics: {
        create: [
          { weight: 72, bodyFat: 20 },
        ],
      },
      preferences: {
        create: {
          dietType: "vegetarian",
          allergies: ["lactose"],
          dislikes: ["spinach"],
          workoutStyle: [WorkoutType.WEIGHT_LIFTING, WorkoutType.RUNNING],
        },
      },
      goals: {
        create: {
          goalType: GoalType.GAIN,
          targetWeight: 80,
          weeklyChange: 0.5,
        },
      },
    },
  });

  // Charlie
  await prisma.user.upsert({
    where: { email: "charlie@example.com" },
    update: {},
    create: {
      name: "Charlie Davis",
      email: "charlie@example.com",
      password: "charlie@example.com",
      role: Role.USER,
      gender: Gender.MALE,
      height: 182,
      birthDate: new Date("1981-02-10"),
      metrics: {
        create: [
          { weight: 75, bodyFat: 22 },
        ],
      },
      preferences: {
        create: {
          dietType: "vegan",
          allergies: [],
          dislikes: ["tofu"],
          workoutStyle: [WorkoutType.CALISTHENICS, WorkoutType.PILATES],
        },
      },
      goals: {
        create: {
          goalType: GoalType.MAINTAIN,
          targetWeight: 75,
          weeklyChange: 0,
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log("Seeding done ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
