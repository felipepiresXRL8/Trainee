export interface OS {
  id: number;
  cliente: string;
  aparelho: string;
  defeito: string;
  status: 'Aberto' | 'Em andamento' | 'Finalizado';
}