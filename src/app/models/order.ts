import { ICartItem } from './cart';
import { IAddress } from './user';

export interface IPrePrice {
  total_with_discount: number;
  total_without_discount: number;
  total_customizations: number;
  total_discount: number;
  items: ICartItem[];
}

export type TNewOrder = IPrePrice & {
  address_id: number;
  address: IAddress;
  items_id: number[];
  shipping_price: number;
  shipping_method: 'pac' | 'sedex';
};
