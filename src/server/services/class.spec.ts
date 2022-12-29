import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { checkUserAgainsRole } from "./class";
import { prisma } from "../db/client";
import { mock } from "../db/mock";
import { faker } from "@faker-js/faker";

describe("class service", () => {
  const userId = faker.datatype.uuid();
  const classId = faker.datatype.uuid();
  const schoolId = faker.datatype.uuid();

  beforeAll(async () => {
    await prisma.school.create({
      data: {
        ...mock.school(),
        id: schoolId,
      },
    });
    await prisma.user.create({
      data: {
        ...mock.user(),
        id: userId,
      },
    });
    await prisma.class.create({
      data: {
        ...mock.class(),
        id: classId,
        schoolId: schoolId,
      },
    });

    await prisma.classUsers.create({
      data: {
        classId,
        userId,
        role: "TEACHER",
      },
    });
  });

  it("should test the user for role", async () => {
    const isTeacher = await checkUserAgainsRole({
      userId,
      classId,
      role: "TEACHER",
    });

    expect(isTeacher).toBe(true);
  });

  it("should test the user for role", async () => {
    const isTeacher = await checkUserAgainsRole({
      userId,
      classId,
      role: "STUDENT",
    });

    expect(isTeacher).toBe(false);
  });

  afterAll(async () => {
    await prisma.classUsers.delete({
      where: {
        classId_userId: {
          classId,
          userId,
        },
      },
    });
    await prisma.class.delete({
      where: {
        id: classId,
      },
    });
    await prisma.school.delete({
      where: {
        id: schoolId,
      },
    });
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  });
});
