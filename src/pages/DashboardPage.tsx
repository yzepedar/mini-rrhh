import { useEffect, useState } from "react";

function DashboardPage() {
  const [userName, setUserName] = useState<string>("");

  // Recuperar nombre del usuario desde localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Texto de bienvenida dinámico */}
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Bienvenido, {userName || "Usuario"} 
      </h1>

      {/* Contenedor responsive para las tarjetas */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Tarjeta 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 transition-shadow duration-200 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800">Empleados activos</h2>
          <p className="text-slate-500 mt-2">Total: 5</p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 transition-shadow duration-200 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800">Departamentos</h2>
          <p className="text-slate-500 mt-2">Total: 5</p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1 transition-shadow duration-200 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800">Proyectos</h2>
          <p className="text-slate-500 mt-2">Total: 3</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
