import express from "express";
import { validateToken } from "../utils";
import { prisma } from "../..";

export const userRouter = express.Router();

userRouter.get("/", validateToken, async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      techs: true,
    },
  });

  res.json(users);
});

userRouter.get("/me", validateToken, async (req, res) => {
  const techs = await prisma.tech.findMany({
    where: {
      users: {
        some: {
          id: (req as any).user.id,
        },
      },
    },
  });
  res.json(techs);
});

export default userRouter;
