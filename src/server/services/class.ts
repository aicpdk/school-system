import type { ClassRoles } from "@prisma/client";
import { prisma } from "../db/client";

type CheckRoleArgs = {
  classId: string;
  userId: string;
  role: ClassRoles;
};
export const checkUserAgainsRole = async ({
  classId,
  role,
  userId,
}: CheckRoleArgs) => {
  const _class = await prisma.class.findUnique({
    where: {
      id: classId,
    },
    include: {
      classUsers: {
        where: {
          userId,
        },
      },
    },
  });

  if (!_class) {
    return false;
  }

  if (_class.classUsers.length === 0) {
    return false;
  }

  const classUser = _class.classUsers[0];

  if (!classUser) {
    return false;
  }

  return classUser.role === role;
};
