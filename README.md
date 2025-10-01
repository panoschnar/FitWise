# Fitwise – Personalized Fitness & Nutrition Recommendation Engine

**Description:**  
Fitwise is a full-stack fitness app that provides personalized diet and nutrition recommendations based on user metrics and goals. Users input their age, weight, height, activity level, and fitness goals (muscle gain, fat loss, or weight maintenance) to receive calorie and macronutrient targets. Over time, the app can adapt recommendations using machine learning for truly personalized guidance.

---

## Folder Structure

fitwise/
│
├── frontend/ # Next.js + TypeScript + SCSS UI
├── backend/ # Node.js/Express API + Prisma DB
├── ml-service/ # ML logic, synthetic dataset, and training scripts
├── docs/ # Documentation and notebooks
└── README.md


---

## Tech Stack

- **Frontend:** Next.js, TypeScript, SCSS  
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL/SQLite  
- **ML Service:** TensorFlow.js (Node) or Python (future upgrade)  
- **Database:** SQLite/PostgreSQL via Prisma  

---

## Features

- User intake form for height, weight, age, activity, and fitness goals  
- Rule-based calorie & macro recommendation (MVP)  
- Store user measurements over time (weight, body fat %)  
- Progress tracking dashboard with charts  
- ML-powered personalization (learns from user progress)  

---


