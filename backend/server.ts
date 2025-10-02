import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handling middleware (last)
app.use(errorHandler);

app.listen(port, () => {
  console.log( `🚀 Server is running on http://localhost:${port}`);
});
