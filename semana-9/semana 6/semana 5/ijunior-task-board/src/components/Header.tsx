export function Header() {
  return (
    
    <header className="bg-blue-900 text-white p-6 shadow-md mb-8">


      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tighter">iRepair 🛠️</h1>
          <p className="text-blue-200 text-xs">Gestão de Ordens de Serviço</p>
        </div>
        <span className="text-xs bg-blue-800 px-3 py-1 rounded-full border border-blue-700">
          Painel do Técnico
        </span>
      </div>
    </header>
  );
}