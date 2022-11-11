import { ISchool } from '../../interfaces/ISchool';

export class SchoolClientService {
  async getAll(): Promise<ISchool[]> {
    const response = await fetch('api/schools', { method: 'GET' });
    const data = await response.json();

    return data;
  }
}
