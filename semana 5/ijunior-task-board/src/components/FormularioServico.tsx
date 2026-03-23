import { useState } from 'react';
import type { OS } from '../types';

interface Props {
  aoSalvar: (novaOS: OS) => void;
}

export function FormularioServico({ aoSalvar }: Props) {
  const [nome, setNome] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [problema, setProblema] = useState('');

  const lidarComEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!nome || !equipamento) return alert("Preencha os campos principais!");

    const novaOS: OS = {
      id: Math.floor(Math.random() * 10000), 
      cliente: nome,
      aparelho: equipamento,
      defeito: problema,
      status: 'Aberto'
    };

    aoSalvar(novaOS);
    
    
    setNome('');
    setEquipamento('');
    setProblema('');
  };

  return (
    <form onSubmit={lidarComEnvio} className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Nova Ordem de Serviço</h2>
      <div className="flex flex-col gap-3">
        <input 
          className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" 
          placeholder="Nome do Cliente" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input 
          className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" 
          placeholder="Modelo do Aparelho (Ex: iPhone 13)" 
          value={equipamento}
          onChange={(e) => setEquipamento(e.target.value)}
        />
        <textarea 
          className="p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none" 
          placeholder="Descrição do defeito..." 
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
        />
        <button className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
          Cadastrar Ordem
        </button>
      </div>
    </form>
  );
}
