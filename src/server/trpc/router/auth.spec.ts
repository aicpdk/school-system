import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mock } from "@db/mock";
import { appRouter } from "@server/trpc/router/_app";
import { prisma } from "@db/client";
import { createContextInner } from "@server/trpc/context";

try {
  describe("auth router", () => {
    const user = mock.user();
    const mockedSession = createContextInner({
      session: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
        expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
      },
    });

    beforeAll(async () => {
      const user = mock.user();
      await prisma.user.create({
        data: {
          ...user,
        },
      });
    });

    it("should pass when called with valid session", async () => {
      try {
        const session = await appRouter.auth.getSecretMessage({
          ctx: { session: mockedSession },
          path: "auth.getSession",
          input: {},
          rawInput: {},
          type: "query",
        });
        expect(session).to.be.equal("you can now see this secret message!");
      } catch (error) {
        console.log(error);
        expect(error).to.be.equal(undefined);
      }
    });

    it("should fail when called without a session", async () => {
      console.log("starting");
      try {
        const session = await appRouter.auth.getSecretMessage({
          ctx: { session: {} },
          path: "auth.getSession",
          input: {},
          rawInput: {},
          type: "query",
        });

        expect(session).to.be.equal(undefined);
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).to.be.equal("UNAUTHORIZED");
        }
      }
    });

    it("should fail when called with an expired session", async () => {
      try {
        const session = await appRouter.auth.getSecretMessage({
          ctx: {
            session: {
              ...mockedSession,
              expires: new Date().getTime() - 1000,
            },
          },
          path: "auth.getSession",
          input: {},
          rawInput: {},
          type: "query",
        });

        expect(session).to.be.equal(undefined);
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).to.be.equal("UNAUTHORIZED");
        }
      }
    });

    it("should fail when the userId does not exist in the database", async () => {
      try {
        const session = await appRouter.auth.getSecretMessage({
          ctx: {
            session: {
              ...mockedSession,
              user: {
                id: "non-existing-id",
              },
            },
          },
          path: "auth.getSession",
          input: {},
          rawInput: {},
          type: "query",
        });

        expect(session).to.be.equal(undefined);
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).to.be.equal("UNAUTHORIZED");
        }
      }
    });

    afterAll(async () => {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    });
  });
} catch (error) {
  console.error(error);
}
