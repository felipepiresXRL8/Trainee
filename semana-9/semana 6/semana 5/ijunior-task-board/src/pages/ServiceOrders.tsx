import { useEffect, useState } from 'react';
import  api  from '../services/api';
import type { ServiceOrder, Client } from '../types';

export const ServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  
  
  const [selectedClientId, setSelectedClientId] = useState('');
  const [device, setDevice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [ordersRes, clientsRes] = await Promise.all([
      api.get('/service-orders'),
      api.get('/clients')
    ]);
    setOrders(ordersRes.data);
    setClients(clientsRes.data);
  }

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/service-orders', {
      clientId: selectedClientId,
      device,
      description,
      status: 'open'
    });
    setDevice(''); setDescription('');
    fetchData();
  };

  const handleDeleteOrder = async (id: string) => {
    await api.delete(`/service-orders/${id}`);
    fetchData();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddOrder} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h2 className="text-xl font-bold">Register New OS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            className="p-2 border rounded bg-white"
            value={selectedClientId}
            onChange={e => setSelectedClientId(e.target.value)}
          >
            <option value="">Select a Client</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="p-2 border rounded" placeholder="Device" value={device} onChange={e => setDevice(e.target.value)} />
          <input className="p-2 border rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
          Create Service Order
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-blue-900">{order.device}</p>
              <p className="text-sm text-gray-500">{order.description}</p>
              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-400 font-mono">
                ID: {order.id}
              </span>
            </div>
            <button onClick={() => handleDeleteOrder(order.id)} className="text-red-400 hover:text-red-600">
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};