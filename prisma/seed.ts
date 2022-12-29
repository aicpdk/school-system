import { faker } from "@faker-js/faker";

import { ClassRoles, PrismaClient } from "@prisma/client";
import { mock } from "../src/server/db/mock";

const prisma = new PrismaClient();

const inBetween = (min: number, max: number) =>
  faker.datatype.number({
    min,
    max,
  });

async function main() {
  await prisma.schoolUsers.deleteMany({});
  await prisma.classUsers.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.school.deleteMany({});

  const school = await prisma.school.create({
    data: mock.school(),
  });

  const classes = Array.from({ length: 10 }).map(() => ({
    id: faker.datatype.uuid(),
    name: `${faker.word.noun()} ${faker.word.noun()}`,
    schoolId: school.id,
  }));
  await prisma.class.createMany({
    data: classes,
  });

  const users = Array.from({ length: 100 }).map((args, index) =>
    mock.user({
      username: index === 0 ? "admin" : undefined,
    })
  );
  await prisma.user.createMany({
    data: users,
  });

  await prisma.classUsers.createMany({
    data: users.reduce((list, user) => {
      const set = new Set<number>();
      set.add(inBetween(0, classes.length - 1));
      set.add(inBetween(0, classes.length - 1));
      set.add(inBetween(0, classes.length - 1));
      Array.from(set).forEach((index) =>
        list.push({
          userId: user.id,
          classId: classes[index]!.id,
          role: inBetween(0, 10) < 2 ? ClassRoles.TEACHER : ClassRoles.STUDENT,
        })
      );
      return [...list];
    }, [] as { userId: string; classId: string; role: ClassRoles }[]),
  });

  const events = await prisma.event.createMany({
    data: classes.map(() => {
      return {
        ...mock.event(),
        createdById: users[0]!.id,
      };
    }),
  });

  // await prisma.event.createMany({
  //   data: Array.from({ length: 3 }).map(() => {
  //     const event = mock.event();

  //     return {
  //       ...event,
  //     };
  //   }),
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
