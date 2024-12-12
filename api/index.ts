import express from "express";
import cors from "cors";
import userRouter from "./src/routes/user.routes";
import techRouter from "./src/routes/tech.routes";
import authRoutes from "./src/routes/auth.routes";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

app.use("/auth", authRoutes);
app.use("/users", userRouter);
app.use("/tech", techRouter);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
