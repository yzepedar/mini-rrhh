// src/App.tsx

import Header from './layouts/Header';
import EmployeesPage from './pages/EmployeesPage';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
      }}
    >
      <Header />
      <main style={{ padding: '24px' }}>
        <EmployeesPage />
      </main>
    </div>
  );
}

export default App;