
interface CardServico {
  os: any;
}

export const CardServico = ({ os }: CardServico) => {
  
  const statusColor = 
    os.status === 'Aberto' ? 'bg-green-100 text-green-800 border-green-200' :

    os.status === 'Finalizado' ? 'bg-gray-100 text-gray-800 border-gray-200' :

    'bg-blue-100 text-blue-800 border-blue-200';

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mb-3">


      <div className="flex justify-between items-start mb-2">


        <h3 className="font-bold text-lg">{os.cliente}</h3>

        <span className={`px-2 py-1 rounded text-xs font-semibold border ${statusColor}`}>

          {os.status}
        </span>

        
      </div>
      <p className="text-sm text-gray-600"><strong>Aparelho:</strong> {os.aparelho}</p>
      <p className="text-sm text-gray-600 mt-1 italic">"{os.defeito}"</p>
    </div>
  );
};


export default CardServico