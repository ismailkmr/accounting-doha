import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Daybook from './components/Daybook';
import Ledger from './components/Ledger';
import PurchaseReport from './components/PurchaseReport';
import SalesReport from './components/SalesReport';
import Sidebar from './components/Sidebar';
import EmployeesList from './components/employees/EmployeesList';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeDetails from './components/employees/EmployeeDetails';

function AppContent() {
  const location = useLocation();
  const hideOn = ['/', '/login', '/signin'];
  const showSidebar = !hideOn.includes(location.pathname);

  return (
    <div className="d-flex">
      {showSidebar && <Sidebar />}
      <div className="main-content" style={{ flex: 1, width: '100%' }}>
        {/* top stripe */}
        <div className="app-top-stripe" />
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daybook" element={<Daybook />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/purchase-report" element={<PurchaseReport />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.body.classList.add('with-top-stripe');
    return () => document.body.classList.remove('with-top-stripe');
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
