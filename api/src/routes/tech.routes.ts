import express from "express";

export const techRouter = express.Router();

const tech: string[] = [];

techRouter.get("/", (req, res) => {
  const filter = req.query.filter as string;

  if (filter) {
    res.json(tech.filter((t) => t.includes(filter)));
  } else {
    res.json(tech);
  }
});

techRouter.post("/", (req, res) => {
  const newTech = req.body.tech;
  if (!newTech) {
    res.status(400).json({ message: "Tech is required" });
    return;
  }
  if (tech.includes(newTech)) {
    res.status(400).json({ message: "Tech already exists" });
    return;
  }
  tech.push(newTech);
  res.json(tech);
});

export default techRouter;
