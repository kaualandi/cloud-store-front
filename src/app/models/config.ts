export interface ITag {
  id: number;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
  config_id: number;
}

export interface IBanner {
  id: number;
  image: string;
  created_at: string;
  updated_at: string;
  config_id: number;
}

export interface IConfig {
  id: number;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  tiktok: string;
  email: string;
  phone: string;
  cnpj: string;
  customization_fee: number;
  delivery_fee: number;
  free_shipping: boolean;
  installment_limit: number;
  created_at: string;
  updated_at: string;
  tags: ITag[];
  articles: [];
  banners: IBanner[];
}
