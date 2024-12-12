import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authRoutes = express.Router();

type User = { username: string; password: string };
const users: User[] = [];

authRoutes.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
  }
  if (users.find((user) => user.username === username)) {
    res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

authRoutes.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }
  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    res.status(401).json({ message: "invalid credentials" });
    return;
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.json({ token });
});

export default authRoutes;
