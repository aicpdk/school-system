import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.account.deleteMany({});
  await prisma.person.deleteMany({});

  const adminPerson = await prisma.person.create({
    data: {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
    },
  });

  const password = await bcrypt.hash("Test!123", 10);
  const adminAccount = await prisma.account.create({
    data: {
      id: faker.datatype.uuid(),
      username: "admin",
      password,
      person: {
        connect: {
          id: adminPerson.id,
        },
      },
    },
  });

  console.log(adminAccount);
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
