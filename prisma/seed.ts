import { faker } from '@faker-js/faker';
import { PrismaClient, ResourceType, PermissionType, Permission } from '@prisma/client';
import { hash } from '../src/services/server/bcrypt.service';

const prisma = new PrismaClient();

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  try {
    await prisma.roleToPermission.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.personToSchool.deleteMany({});
    await prisma.school.deleteMany({});
    await prisma.person.deleteMany({});

    const storedSchool = await prisma.school.create({
      data: {
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        adress: faker.address.streetAddress(),
        city: faker.address.cityName(),
        zip: Number(faker.address.zipCode('#####')),
        countryCode: faker.address.countryCode(),
      },
    });

    const people = Array.from({ length: 100 }).map(() => ({
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
    const storedPeople = await prisma.person.createMany({
      data: people,
    });

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
    const storedAdmin = await prisma.user.create({
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

    const teacherPermission = permissions.filter(
      (permission) =>
        (permission.type === 'READ' && ['STUDENT', 'CLASS'].includes(permission.resource)) ||
        (permission.type === 'READ' && ['ATTENDENCE'].includes(permission.resource))
    );
    const teacherRole = await prisma.role.create({
      data: {
        id: faker.datatype.uuid(),
        name: 'TEACHER',
      },
    });
    await prisma.roleToPermission.createMany({
      data: teacherPermission.map((permission) => ({
        permissionId: permission.id,
        roleId: teacherRole.id,
      })),
    });

    const storedTeachers = await prisma.$transaction(
      Array.from({ length: 20 }).map((_, index) =>
        prisma.user.create({
          data: {
            id: faker.datatype.uuid(),
            password: hashedPassword,
            username: `teacher${index}`,
            isVerified: false,
            Person: {
              connect: {
                id: people[randomIntFromInterval(0, 99)].id,
              },
            },
            Role: {
              connect: {
                id: adminRole.id,
              },
            },
          },
        })
      )
    );
  } finally {
    prisma.$disconnect();
  }
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
