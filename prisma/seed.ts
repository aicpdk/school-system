import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';
import { PrismaClient, Employee, Department, Company, Role, EmployeeOnDepartment, Customer, Invoice, Vehicle } from '@prisma/client';

const prisma = new PrismaClient();

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  await prisma.employeeOnDepartment.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.employee.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.company.deleteMany({});

  const companyId = faker.datatype.uuid();
  await prisma.company.create({
    data: {
      id: companyId,
      name: faker.company.name(),
      cvr: faker.datatype.number({ min: 10000000, max: 99999999 }).toString(),
      createdAt: new Date(),
    },
  });

  const roles: Role[] = [
    { id: faker.datatype.uuid(), name: 'admin' },
    { id: faker.datatype.uuid(), name: 'employee' },
  ];
  await prisma.role.createMany({ data: roles });

  // the reason is to be able to login with these accounts
  const password = await hash('Test!123', 10);
  const employees: Employee[] = [];
  for (let index = 0; index < 20; index++) {
    employees.push({
      id: faker.datatype.uuid(),
      email: index === 0 ? 'test@test.test' : faker.internet.email(),
      password,
      firstname: faker.name.firstName('male'),
      lastname: faker.name.lastName('female'),
      phone: faker.phone.number('+45 ########'),
      isEmailVerified: true,
      companyId,
      createdAt: faker.date.past(),
      roleId: index === 0 ? roles.at(0)!.id : roles.at(1)!.id,
    });
  }

  const departmentId = faker.datatype.uuid();
  const departments: Department[] = Array.from({ length: 3 }).map((_, index) => ({
    companyId,
    id: index === 0 ? departmentId : faker.datatype.uuid(),
    isHQ: index === 0,
    name: faker.company.name(),
    city: faker.address.city(),
    street: faker.address.street(),
    country: 'denmark',
    zip: faker.address.zipCode('####'),
    createdAt: faker.date.past(),
  }));

  await Promise.all([
    prisma.employee.createMany({
      data: employees,
    }),
    prisma.department.createMany({
      data: departments,
    }),
  ]);

  const connectEmployeeWithDepartment = async (employeeId: string, departmentId: string) =>
    prisma.employeeOnDepartment.create({
      data: {
        Department: {
          connect: { id: departmentId },
        },
        Employee: {
          connect: { id: employeeId },
        },
        dateAdded: faker.date.past(),
      },
    });

  const employeeOnDepartment1 = employees.slice(0, 8).map((employee) => connectEmployeeWithDepartment(employee.id, departments.at(0)!.id));
  const employeeOnDepartment2 = employees.slice(8, 15).map((employee) => connectEmployeeWithDepartment(employee.id, departments.at(1)!.id));
  const employeeOnDepartment3 = employees.slice(15).map((employee) => connectEmployeeWithDepartment(employee.id, departments.at(2)!.id));
  await Promise.all([...employeeOnDepartment1, ...employeeOnDepartment2, ...employeeOnDepartment3]);

  const customers = Array.from({ length: 1000 }).map(async () => {
    return await prisma.customer.create({
      data: {
        id: faker.datatype.uuid(),
        companyId,
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: faker.phone.number('+45 ########'),
        city: faker.address.city(),
        street: faker.address.street(),
        country: 'denmark',
        zip: faker.address.zipCode('####'),
        Vehicles: {
          createMany: {
            data: Array.from({ length: randomIntFromInterval(1, 4) }).map(() => ({
              createdAt: faker.date.past(),
              id: faker.datatype.uuid(),
              brand: faker.vehicle.manufacturer(),
              model: faker.vehicle.model(),
              registrationNumber: faker.vehicle.vrm(),
            })),
          },
        },
      },
    });
  });
  const storedCustomers = await Promise.all(customers);

  const invoices = Array.from({ length: 200 }).map(async () => {
    const products = Array.from({ length: 4 }).map(() => ({
      Company: { connect: { id: companyId } },
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price(50, 1000)),
    }));

    const customerId = storedCustomers[randomIntFromInterval(0, 999)].id;
    const vehicles = await prisma.vehicle.findMany({
      where: {
        customerId,
      },
    });

    const createdAt = faker.date.past();

    return prisma.invoice.create({
      data: {
        companyId,
        customerId,
        departmentId: departments[randomIntFromInterval(0, 2)].id,
        employeeId: employees[randomIntFromInterval(0, 19)].id,
        totalPrice: products.reduce((prev, curr) => prev + curr.price, 0),
        Products: { create: products },
        vehicleId: vehicles[randomIntFromInterval(0, vehicles.length - 1)].id,
        createdAt,
        payedAt: randomIntFromInterval(0, 3) === 0 ? null : faker.date.between(createdAt, new Date()),
      },
    });
  });

  await Promise.all(invoices);
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
