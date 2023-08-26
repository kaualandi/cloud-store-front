import { IProduct, IProductVariant } from './product';

export type IProductCart = Omit<IProduct, 'product_variant'>;

export type IProductVariantCart = IProductVariant & {
  product: IProductCart;
};

export interface ICartItem {
  id: number;
  quantity: number;
  customization: boolean;
  product_variant_id: number;
  product_variant: IProductVariantCart;
  customization_name: string | null;
  customization_number: number | null;
}
