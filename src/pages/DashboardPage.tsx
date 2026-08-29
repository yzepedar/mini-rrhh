// src/pages/DashboardPage.tsx

import { Link } from 'react-router-dom';
import { mockEmployees } from '../utils/mockData';
import { useAuthStore } from '../store/authStore';

function DashboardPage() {
  const total = mockEmployees.length;
  const active = mockEmployees.filter(e => e.status === 'active').length;
  const onLeave = mockEmployees.filter(e => e.status === 'on_leave').length;

  // Texto de bienvenida dinámico: lee el nombre guardado por LoginPage.tsx
  const userName = useAuthStore(state => state.user?.name) || 'invitado';

  const stats = [
    { label: 'Total empleados', value: total, bg: 'bg-blue-100', text: 'text-blue-800' },
    { label: 'Activos', value: active, bg: 'bg-green-100', text: 'text-green-800' },
    { label: 'En permiso', value: onLeave, bg: 'bg-yellow-100', text: 'text-yellow-800' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h2>
      {userName && (
       <span className="text-slate-500 mb-6 block animate-pulse">
  Bienvenido, {userName}
</span>
      )}
      {!userName && <div className="mb-6" />}

      <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
        {stats.map(stat => (
          <div
            key={stat.label}
            className={`${stat.bg} p-6 rounded-xl min-w-[160px] flex-1
                       hover:shadow-lg transition-shadow duration-200`}
          >
            <p className={`${stat.text} text-sm mb-1`}>{stat.label}</p>
            <p className={`${stat.text} text-4xl font-bold`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to="/empleados"
          className="px-5 py-2.5 bg-brand-800 hover:bg-brand-700 text-white
                    rounded-lg text-sm transition-colors"
        >
          Ver empleados →
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;