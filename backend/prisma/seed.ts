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
      password:"alice@example.com",
      role: Role.USER,
      metrics: {
        create: {
          weight: 70,
          height: 165,
          age: 28,
          gender: Gender.FEMALE,
          bodyFat: 30,
        },
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
        create: [
          {
            goalType: GoalType.LOSE,
            targetWeight: 60,
            weeklyChange: 0.5,
          },
        ],
      },
      dietPlans:{
        create:[
            {
               diet:{
  Monday: {
    Breakfast: "Oats + berries",
    Snack: "Greek yogurt",
    Lunch: "Grilled chicken + quinoa",
    Snack2: "Protein shake",
    Dinner: "Salmon + broccoli",
  },
  Tuesday: {
    Breakfast: "Scrambled eggs + avocado toast",
    Snack: "Apple + peanut butter",
    Lunch: "Turkey wrap + salad",
    Snack2: "Mixed nuts",
    Dinner: "Steak + sweet potato",
  },
  Wednesday: {
    Breakfast: "Smoothie bowl",
    Snack: "Rice cakes + hummus",
    Lunch: "Tuna salad",
    Snack2: "Protein bar",
    Dinner: "Pasta + chicken",
  },
  Thursday: {
    Breakfast: "Chia pudding",
    Snack: "Boiled eggs",
    Lunch: "Veggie stir-fry + tofu",
    Snack2: "Fruit salad",
    Dinner: "Fish tacos",
  },
  Friday: {
    Breakfast: "Avocado toast + poached eggs",
    Snack: "Trail mix",
    Lunch: "Grilled salmon + asparagus",
    Snack2: "Cottage cheese",
    Dinner: "Chicken curry + rice",
  },
  Saturday: {
    Breakfast: "Banana pancakes",
    Snack: "Smoothie",
    Lunch: "Buddha bowl",
    Snack2: "Popcorn",
    Dinner: "BBQ chicken wings + salad",
  },
  Sunday: {
    Breakfast: "French toast + strawberries",
    Snack: "Yogurt parfait",
    Lunch: "Burger (lean beef) + sweet potato fries",
    Snack2: "Protein shake",
    Dinner: "Roast beef + veggies",
  },
}
            }
        ]
      }
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
      metrics: {
        create: {
          weight: 72,
          height: 178,
          age: 35,
          gender: Gender.MALE,
          bodyFat: 20,
        },
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
        create: [
          {
            goalType: GoalType.GAIN,
            targetWeight: 80,
            weeklyChange: 0.5,
          },
        ],
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
      metrics: {
        create: {
          weight: 75,
          height: 182,
          age: 42,
          gender: Gender.MALE,
          bodyFat: 22,
        },
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
        create: [
          {
            goalType: GoalType.MAINTAIN,
            targetWeight: 75,
            weeklyChange: 0,
          },
        ],
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
