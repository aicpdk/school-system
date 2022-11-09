import { Person, RoleType } from '@prisma/client';
import { IPersonWithRoles } from '../../interfaces/IPerson';

export class PeopleClientService {
  async getPeople(): Promise<IPersonWithRoles[]> {
    const response = await fetch('api/people', { method: 'GET' });
    const data = await response.json();

    return data;
  }
}
