import { ISchoolClass } from '../../interfaces/ISchoolClass';
export class ClassClientService {
  async getAll(): Promise<ISchoolClass[]> {
    const response = await fetch('api/classes', { method: 'GET' });
    const data = await response.json();

    return data;
  }
}
