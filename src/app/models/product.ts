import { ITeam } from './team';

export interface IProductImage {
  id: number;
  product_id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  base_price: number;
  trending: boolean;
  discount: number;
  team_id: number;
  sold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  team: ITeam;
  images: IProductImage[];
}
