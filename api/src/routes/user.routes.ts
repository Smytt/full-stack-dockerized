import express from "express";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ message: "all users" });
});

userRouter.get("/:id", (req, res) => {
  res.json({ message: "one users" });
});

export default userRouter;
