import { Person, RoleType } from '@prisma/client';

export interface IPersonWithRoles extends Person {
  roles: RoleType[];
}
