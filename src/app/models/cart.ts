import { IProductVariant } from './product';

export interface ICartItem {
  id: number;
  quantity: number;
  customization: boolean;
  product_variant_id: number;
  product_variant: IProductVariant;
  customization_name: string;
  customization_number: number;
}
