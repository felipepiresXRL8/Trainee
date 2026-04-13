import { Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Clients } from '../pages/Clients';
import { ServiceOrders } from '../pages/ServiceOrders';
import { Login } from '../pages/Login';
import { PrivateRoute } from '../components/PrivateRoute';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black">iRepair 🛠️</h1>
          <div className="space-x-6 font-bold text-sm">
            <Link to="/" className="hover:text-blue-300">Dashboard</Link>
            <Link to="/clients" className="hover:text-blue-300">Clients</Link>
            <Link to="/service-orders" className="hover:text-blue-300">Orders</Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-blue-300">{user?.name}</span>
            <button
              onClick={logout}
              className="bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded font-bold"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export const Router = () => (
  <Routes>
    {/* Rota pública */}
    <Route path="/login" element={<Login />} />

    {/* Rotas protegidas — todas dentro do Layout */}
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="clients" element={<Clients />} />
      <Route path="service-orders" element={<ServiceOrders />} />
    </Route>

    {/* Qualquer rota desconhecida vai pro Dashboard */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);