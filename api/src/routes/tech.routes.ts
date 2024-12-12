import express from "express";
import { validateToken } from "../utils";
import { prisma } from "../..";

export const techRouter = express.Router();

techRouter.get("/", validateToken, async (req, res) => {
  const filter = req.query.filter as string | undefined;
  let techs;

  if (filter) {
    techs = await prisma.tech.findMany({
      where: { name: { contains: filter, mode: "insensitive" } },
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
    });
  } else {
    techs = await prisma.tech.findMany({
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  res.json(techs);
});

techRouter.post("/", validateToken, async (req, res) => {
  const techs = req.body.techs as string[];
  const userId = (req as any).user.id;

  await prisma.$transaction(async (prisma) => {
    const existingTechs = await prisma.tech.findMany({
      where: {
        name: {
          in: techs,
        },
      },
    });

    const existingTechNames = existingTechs.map((tech) => tech.name);
    const newTechs = techs.filter((tech) => !existingTechNames.includes(tech));

    await prisma.tech.createMany({
      data: newTechs.map((name) => ({ name })),
      skipDuplicates: true, // This option ensures that duplicates within this call are skipped
    });

    const allTechs = await prisma.tech.findMany({
      where: {
        name: {
          in: techs,
        },
      },
    });

    const currentUserTechs = await prisma.user.findUnique({
      where: { id: userId },
      include: { techs: true },
    });

    const techsToDisconnect = currentUserTechs?.techs.filter(
      (tech) => !techs.includes(tech.name)
    );

    await prisma.user.update({
      where: { id: userId },
      data: {
        techs: {
          disconnect: techsToDisconnect?.map((tech) => ({ id: tech.id })),
          connect: allTechs.map((tech) => ({ id: tech.id })),
        },
      },
    });
  });

  const { password: _, ...userWithoutPassword } = (req as any).user;

  res.json(userWithoutPassword);
});

export default techRouter;
