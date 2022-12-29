import { ClassRoles } from "@prisma/client";
import { prisma } from "../../db/client";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { checkUserAgainsRole } from "../../services/class";

export const classRouter = router({
  getClasses: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.class.findMany({
      where: {
        classUsers: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),
  getClass: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const _class = await prisma.class.findUnique({
        where: {
          id: input.id,
        },
        include: {
          classUsers: {
            select: {
              role: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const students = _class?.classUsers
        .filter((user) => user.role === ClassRoles.STUDENT)
        .map(transformUserObject);

      const teachers = _class?.classUsers
        .filter((user) => user.role === ClassRoles.TEACHER)
        .map(transformUserObject);

      return {
        name: _class?.name,
        createdAt: _class?.createdAt,
        students,
        teachers,
      };
    }),
  createClassEvent: protectedProcedure
    .input(
      z.object({
        classId: z.string().uuid(),
        startDate: z.date(),
        endDate: z.date(),
        recurrance: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "NONE"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // check if the user has permission to create a class event

      const hasPermission = await checkUserAgainsRole({
        classId: input.classId,
        userId: ctx.session.user.id,
        role: ClassRoles.TEACHER, // TODO Check if the user has the correct permission
      });

      if (!hasPermission) {
        throw new Error("permission denied");
      }

      return;
    }),
});

const transformUserObject = (user: any) => ({
  role: user.role,
  name: user.user.name,
});
