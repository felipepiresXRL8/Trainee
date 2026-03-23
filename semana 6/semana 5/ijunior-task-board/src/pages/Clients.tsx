import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Client } from '../types';

export const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

 



  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const response = await api.get('/clients');

    setClients(response.data);
  }

  
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      await api.post('/clients', { name, email });
      alert("Client added!");
      setName(''); setEmail('');
      fetchClients(); 
    } catch {
      alert("Failed to add client. Check your token.");
    }
  };

 
  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await api.delete(`/clients/${id}`);
    fetchClients();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddClient} className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">Add New Client</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            className="flex-1 p-2 border rounded" 
            placeholder="Name" 
            value={name} onChange={e => setName(e.target.value)} 
          />
          <input 
            className="flex-1 p-2 border rounded" 
            placeholder="Email" 
            value={email} onChange={e => setEmail(e.target.value)} 
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-bold text-gray-600">Name</th>
              <th className="p-4 text-sm font-bold text-gray-600">Email</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 font-medium">{client.name}</td>
                <td className="p-4 text-gray-500 text-sm">{client.email}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDeleteClient(client.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};