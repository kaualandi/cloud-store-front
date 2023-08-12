import { IProductVariant } from './product';

export interface ICartItem {
  id: number;
  customization: boolean;
  product_variant_id: number;
  product_variant: IProductVariant;
}
