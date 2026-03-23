export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  device: string;
  description: string;
  status: 'open' | 'ongoing' | 'finished';
  createdAt: string;
}