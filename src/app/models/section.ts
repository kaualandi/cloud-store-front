import { ICategory } from './category';

export interface ISection {
  id: number;
  name: string;
  categorys: ICategory[];
  created_at: string;
  updated_at: string;
}
