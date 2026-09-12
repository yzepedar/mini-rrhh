import { useNavigate, useParams } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployees';

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'long',
});

const statusLabels = {
  active: 'Activo',
  inactive: 'Inactivo',
  on_leave: 'En permiso',
};

const roleLabels = {
  admin: 'Administrador',
  hr: 'Recursos Humanos',
  employee: 'Empleado',
};

function EmployeeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? Number(id) : null;
  const employeeId = parsedId !== null && Number.isInteger(parsedId) ? parsedId : null;
  const { data: employee, isLoading, isError, error } = useEmployee(employeeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
        <span>Cargando empleado...</span>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">No se pudo obtener la información del empleado</p>
          <p className="text-red-500 text-sm mt-1">
            {(error as Error)?.message || 'El empleado no existe o no está disponible.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/empleados')}
          className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        type="button"
        onClick={() => navigate('/empleados')}
        className="mb-6 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors"
      >
        Volver
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden text-blue-700 font-semibold text-2xl flex-shrink-0">
            {employee.avatarUrl ? (
              <img src={employee.avatarUrl} alt={`Avatar de ${employee.name}`} className="w-full h-full object-cover" />
            ) : (
              employee.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{employee.name}</h2>
            <p className="text-slate-500">{employee.position}</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <dt className="text-sm text-slate-500">Nombre</dt>
            <dd className="mt-1 font-medium text-slate-900">{employee.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="mt-1 font-medium text-slate-900 break-words">{employee.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Cargo</dt>
            <dd className="mt-1 font-medium text-slate-900">{employee.position}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Departamento</dt>
            <dd className="mt-1 font-medium text-slate-900">{employee.department}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Salario</dt>
            <dd className="mt-1 font-medium text-slate-900">{currencyFormatter.format(employee.salary)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Fecha de ingreso</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {dateFormatter.format(new Date(`${employee.hireDate}T00:00:00`))}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Estado</dt>
            <dd className="mt-1 font-medium text-slate-900">{statusLabels[employee.status]}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Rol</dt>
            <dd className="mt-1 font-medium text-slate-900">{roleLabels[employee.role]}</dd>
          </div>
          {employee.phone && (
            <div>
              <dt className="text-sm text-slate-500">Teléfono</dt>
              <dd className="mt-1 font-medium text-slate-900">{employee.phone}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

export default EmployeeDetailPage;