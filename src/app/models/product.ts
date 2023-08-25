import { ITeam } from './team';

export interface IProductImage {
  id: number;
  product_id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface IProductAvaliation {
  id: number;
  product_id: number;
  user_id: number;
  avaliation: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface IProductVariant {
  id: number;
  product_id: number;
  name: string;
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
  avaliations: IProductAvaliation[];
  variants: IProductVariant[];
}

export type TOrderBy =
  | 'release'
  | 'lower_price'
  | 'higher_price'
  | 'best_sellers'
  | 'best_evaluation'
  | 'az'
  | 'za';
