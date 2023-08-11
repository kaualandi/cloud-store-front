import { IProduct } from './product';
import { ITeam } from './team';

export interface ITeamsAndSellers {
  teams: ITeam[];
  products: IProduct[];
}
