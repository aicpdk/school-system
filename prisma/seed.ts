import { faker } from '@faker-js/faker';
import { PrismaClient, ResourceType, PermissionType, Permission, RoleType } from '@prisma/client';
import { hash } from '../src/services/server/bcrypt.service';
import { mock } from './mocks';
import { randomIntFromInterval } from './mocks/util';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.roleToPermission.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.personToSchool.deleteMany({});
    await prisma.personToClass.deleteMany({});
    await prisma.class.deleteMany({});
    await prisma.school.deleteMany({});
    await prisma.person.deleteMany({});

    const storedSchool = await prisma.school.create({
      data: mock.school(),
    });

    const people = Array.from({ length: 100 }).map(() => mock.person());
    const storedPeople = await prisma.person.createMany({
      data: people,
    });

    const _linkPeopleToSchool = await prisma.personToSchool.createMany({
      data: people.map((person) => ({ personId: person.id, schoolId: storedSchool.id })),
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
        ...mock.user('admin', hashedPassword),
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
            ...mock.user(`teacher${index}`, hashedPassword),
            isVerified: false,
            Person: {
              connect: {
                id: people[randomIntFromInterval(0, 99)].id,
              },
            },
            Role: {
              connect: {
                id: teacherRole.id,
              },
            },
          },
        })
      )
    );

    const classes = Array.from({ length: 10 }).map(() => {
      return prisma.class.create({
        data: {
          ...mock.schoolClass(),
          CreatedBy: {
            connect: {
              id: people[0].id,
            },
          },
          School: {
            connect: {
              id: storedSchool.id,
            },
          },
        },
      });
    });
    const storedClasses = await Promise.all(classes);

    // prisma.personToClass.create({
    //   data: {
    //     Person: {
    //       connect: person.id,
    //     },
    //     Class: {
    //       connect: {
    //         id: storedClasses[randomIntFromInterval(0, storedClasses.length - 1)].id,
    //       },
    //     },
    //     joinedAt: faker.date.past(),
    //     roleType: '',
    //   },
    // });
    const peopleToClass = people.map(() => {});
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
