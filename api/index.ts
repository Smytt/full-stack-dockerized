import express from "express";
import cors from "cors";
import userRouter from "./src/routes/user.routes";
import techRouter from "./src/routes/tech.routes";
import authRoutes from "./src/routes/auth.routes";
import { PrismaClient } from "@prisma/client";
import { seed } from "./seed";

export const prisma = new PrismaClient();

await seed();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

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
