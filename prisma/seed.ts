import { faker } from '@faker-js/faker';
import { PrismaClient, ResourceType, PermissionType, Permission } from '@prisma/client';
import { hash } from '../src/services/bcrypt.service';

const prisma = new PrismaClient();

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  await prisma.roleToPermission.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.person.deleteMany({});

  const people = Array.from({ length: 10 }).map(() => ({
    id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    address: faker.address.street(),
    age: randomIntFromInterval(20, 60),
    phone: faker.phone.number('+45 ########'),
    city: faker.address.cityName(),
    countryCode: faker.address.countryCode(),
    zip: Number(faker.address.zipCode('####')),
  }));
  const createPeople = people.map((person) =>
    prisma.person.create({
      data: person,
    })
  );
  const storedPeople = await Promise.all(createPeople);

  const permissionTypes: PermissionType[] = ['READ', 'READ_ALL', 'WRITE', 'WRITE_ALL'];
  const resourceTypes: ResourceType[] = ['ATTENDENCE', 'CLASS', 'SCHOOL', 'STUDENT', 'TEACHER', 'USER'];
  const permissions: Permission[] = [];
  resourceTypes.forEach((resource) => {
    permissionTypes.forEach((permission) => {
      permissions.push({
        id: faker.datatype.uuid(),
        resource,
        type: permission,
      });
    });
  });

  const createPermissions = permissions.map((permission) =>
    prisma.permission.create({
      data: permission,
    })
  );
  const storedPermissions = await Promise.all(createPermissions);

  const adminPermissions = permissions.filter((permission) => ['READ_ALL', 'WRITE_ALL'].includes(permission.type));

  const adminRole = await prisma.role.create({
    data: {
      id: faker.datatype.uuid(),
      name: 'ADMIN',
    },
  });

  await prisma.roleToPermission.createMany({
    data: adminPermissions.map((permission) => ({
      permissionId: permission.id,
      roleId: adminRole.id,
    })),
  });

  const hashedPassword = await hash('Test!123');
  await prisma.user.create({
    data: {
      id: faker.datatype.uuid(),
      password: hashedPassword,
      username: 'admin',
      isVerified: false,
      Person: {
        connect: {
          id: people[0].id,
        },
      },
      Role: {
        connect: {
          id: adminRole.id,
        },
      },
    },
  });
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
