export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ServiceOrder {
  id: number;
  clientId: string;
  client?: string;
  device: string;
  aparelho?: string;
  defeito?: string;
  description: string;
  status: 'open' | 'ongoing' | 'finished';
  createdAt: string;
}

export type OS = ServiceOrder;