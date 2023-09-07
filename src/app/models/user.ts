import { IOrder } from './order';

export interface IAddress {
  id: number;
  user_id: number;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUser {
  id: number;
  address?: IAddress[];
  email: string;
  is_admin: boolean;
  name?: string;
  phone?: string;
  cpf?: string;
  birth_date?: string;
  profile_url?: string;
  updated_at?: string;
  created_at?: string;
}

export interface IToken {
  access_token: string;
}

export interface IViaCep {
  erro: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface IAccountResume {
  user: IUser;
  last_order: IOrder;
  user_register_percent: number;
  user_register_text_status: string;
}
