import Header from "./layouts/Header";
import EmployeeCard from "./components/EmployeeCard";
import {StatsBadge} from "./components/StatsBadge";
import { mockEmployees } from "./utils/mockData";
import type { Employee } from "./types";

function App() {
  const handleSelectEmployee = (employee: Employee) => {
    console.log("Empleado seleccionado:", employee.name);
    alert(`Seleccionaste a ${employee.name} — ${employee.position}`);
  };
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(
    (e) => e.status === "active",
  ).length;
  const onLeaveEmployees = mockEmployees.filter(
    (e) => e.status === "on_leave",
  ).length;
  const inactiveEmployees = mockEmployees.filter(
    (e) => e.status === "inactive",
  ).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Header />
      <main style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <StatsBadge
            label="Total de empleados"
            value={totalEmployees}
            color="#1e40af"
          />
          <StatsBadge
            label="Empleados activos"
            value={activeEmployees}
            color="#16a34a"
          />
          <StatsBadge
            label="Empleados en permiso"
            value={onLeaveEmployees}
            color="#ca8a04"
          />
          <StatsBadge
            label="Empleados inactivos"
            value={inactiveEmployees}
            color="#dc2626"
          />
        </div>
        <h2 style={{ marginBottom: "16px", color: "#1e293b" }}>
          Empleados ({mockEmployees.length})
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {mockEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onSelect={handleSelectEmployee}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;