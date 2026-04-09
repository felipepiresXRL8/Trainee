import { useEffect, useState } from 'react';
import api from "../services/api";
import type { ServiceOrder } from '../types';

export const Dashboard = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      alert("Error loading orders. Check your token!");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">Service Orders Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 border rounded shadow-sm">
            <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
              order.status === 'open' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500'
            }`}>
              {order.status}
            </span>
            <p className="font-bold mt-2">{order.device}</p>
            <p className="text-sm text-gray-500">{order.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};