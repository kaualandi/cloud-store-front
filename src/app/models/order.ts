import { ICartItem } from './cart';
import { IAddress } from './user';

export type TPaymentCardMethod = 'CREDIT_CARD' | 'DEBIT_CARD';

export type TPaymentMethod = TPaymentCardMethod | 'PIX' | 'CASH' | 'BILLET';

export type TOrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'SENT'
  | 'DELIVERED';

export interface IPrePrice {
  total_with_discount: number;
  total_without_discount: number;
  total_customizations: number;
  total_discount: number;
  items: ICartItem[];
  cupom_status: boolean;
  cupom_discount: number;
}

export type TNewOrder = IPrePrice & {
  address_id: number;
  address: IAddress;
  items_id: number[];
  shipping_price: number;
  shipping_method: 'pac' | 'sedex';
  cupom: string;
  payment_method: TPaymentMethod;
  installments: number;
  card_number: string;
  card_name: string;
  card_expiration: string;
  card_cvv: string;
};

export interface ICreatedOrder {
  worked: boolean;
  status: string;
  order_id: number;
}

export interface IOrder {
  id: number;
  user_id: number;
  address_id: number;
  subtotal: number;
  delivery_fee: number;
  customization_fee: number;
  total: number;
  tracking_number: string;
  status: TOrderStatus;
  cancelled_reason: string;
  order_items: ICartItem[];
  payment_method: TPaymentMethod;
  payment_id: string;
  installments: number;
  coupon_id: number;
  created_at: string;
  updated_at: string;
  address: IAddress;
}
