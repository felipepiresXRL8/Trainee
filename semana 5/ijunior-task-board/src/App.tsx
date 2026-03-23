import { useState } from 'react';
import type { OS } from './types';
import { Header } from './components/Header';
import { FormularioServico } from './components/FormularioServico';
import { CardServico } from './components/CardServico';

function App() {
  
  const [listaOS, setListaOS] = useState<OS[]>([]);

  const adicionarOS = (nova: OS) => {
    
    setListaOS([nova, ...listaOS]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <FormularioServico aoSalvar={adicionarOS} />

        <div className="flex justify-between items-end mb-6 border-b pb-4 border-gray-200">
          <h2 className="text-2xl font-black text-gray-800">Painel de Acompanhamento</h2>
          <span className="text-sm font-bold text-gray-500 uppercase">
            {listaOS.length} Ordens
          </span>
        </div>

        {listaOS.length === 0 ? (
          <div className="text-center py-20 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 text-gray-400">
            <p className="text-4xl mb-4 text-gray-300">📋</p>
            <p className="font-medium italic">Nenhuma OS encontrada. Cadastre uma nova acima!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listaOS.map((item) => (
              <CardServico key={item.id} os={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;