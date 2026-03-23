import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Clients } from '../pages/Clients';
import { ServiceOrders } from '../pages/ServiceOrders';

const Layout = () => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-blue-900 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-black">iRepair 🛠️</h1>
        <div className="space-x-6 font-bold text-sm">
          <Link to="/" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/clients" className="hover:text-blue-300">Clients</Link>
          <Link to="/service-orders" className="hover:text-blue-300">Orders</Link>
        </div>
      </div>
    </nav>
    <main className="max-w-6xl mx-auto p-6">
      <Outlet /> 
    </main>
  </div>
);

export const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="clients" element={<Clients />} />
      <Route path="service-orders" element={<ServiceOrders />} />
    </Route>
  </Routes>
);