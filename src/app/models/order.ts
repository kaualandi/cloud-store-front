import { ICartItem } from './cart';
import { IAddress } from './user';

export type TPaymentCardMethod = 'CREDIT_CARD' | 'DEBIT_CARD';

export type TPaymentMethod = TPaymentCardMethod | 'PIX' | 'CASH' | 'BILLET';

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
  payment_method: TPaymentMethod;
  installments: number;
  card_number: string;
  card_name: string;
  card_expiration: string;
  card_cvv: string;
};
