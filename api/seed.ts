import { prisma } from ".";

async function main() {
  await prisma.tech.upsert({
    where: { name: "JavaScript" },
    update: {},
    create: { name: "JavaScript" },
  });

  await prisma.tech.upsert({
    where: { name: "TypeScript" },
    update: {},
    create: { name: "TypeScript" },
  });

  await prisma.user.upsert({
    where: { username: "john_doe" },
    update: {},
    create: {
      username: "john_doe",
      password: "password1",
      techs: {
        connect: [{ name: "JavaScript" }, { name: "TypeScript" }],
      },
    },
  });

  await prisma.user.upsert({
    where: { username: "jane_doe" },
    update: {},
    create: {
      username: "jane_doe",
      password: "password2",
      techs: {
        connect: [{ name: "JavaScript" }],
      },
    },
  });

  await prisma.user.upsert({
    where: { username: "alice_smith" },
    update: {},
    create: {
      username: "alice_smith",
      password: "password3",
      techs: {
        connect: [{ name: "TypeScript" }],
      },
    },
  });

  console.log("Seeding completed");
}

export const seed = () => {
  main()
    .catch((e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
