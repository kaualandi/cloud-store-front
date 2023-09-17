export type TContactBack = 'CALL' | 'WHATSAPP' | 'EMAIL';

export interface IContact {
  name: string;
  email: string;
  phone: string;
  contact_back: TContactBack;
  subject: string;
  message: string;
  opened: boolean;
  read: boolean;
  conclusion: string;
  created_at: string;
  updated_at: string;
}
