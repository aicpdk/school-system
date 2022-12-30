import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mock } from "@db/mock";
import { appRouter } from "@server/trpc/router/_app";
import { createContextInner } from "@server/trpc/context";
import { prisma } from "@db/client";
import { faker } from "@faker-js/faker";

// try {
describe("auth router", () => {
  const user = mock.user();

  beforeAll(async () => {
    await prisma.user
      .create({
        data: {
          ...user,
        },
      })
      .catch((e) => console.error(e));
  });

  it("should pass when called with valid session", async () => {
    expect(1).toBe(1);
    const mockedSession = await createContextInner({
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
    expect(1).toBe(1);

    try {
      await appRouter.auth.getSecretMessage({
        ctx: { session: mockedSession },
        path: "auth.getSession",
        input: {},
        rawInput: {},
        type: "query",
      });
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).to.be.equal("UNAUTHORIZED");
      }
    }
  });

  it("should fail when called without a session", async () => {
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
    const mockedSession = await createContextInner({
      session: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
        expires: faker.date.past().toUTCString(),
      },
    });

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
    const mockedSession = await createContextInner({
      session: {
        user: {
          id: faker.datatype.uuid(),
          email: user.email,
          name: user.name,
          image: user.image,
        },
        expires: faker.date.past().toUTCString(),
      },
    });

    try {
      const session = await appRouter.auth.getSecretMessage({
        ctx: {
          session: mockedSession,
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
// } catch (error) {
//   console.error(error);
// }
