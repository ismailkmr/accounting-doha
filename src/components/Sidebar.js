import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const menuItems = [
  { key: 'daybook', label: 'Daybook', to: '/daybook' },
  { key: 'ledger', label: 'Ledger', to: '/ledger' },
  { key: 'purchase', label: 'Purchase Report', to: '/purchase-report' },
  { key: 'sales', label: 'Sales Report', to: '/sales-report' },
  { key: 'employees', label: 'Employee Management', to: '/employees' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (collapsed) document.body.classList.add('sidebar-collapsed');
      else document.body.classList.remove('sidebar-collapsed');
    } catch (e) {
      // ignore in non-browser environment
    }
    return () => {
      try {
        document.body.classList.remove('sidebar-collapsed');
      } catch (e) {}
    };
  }, [collapsed]);

  // mark body when sidebar is mounted so content can react via CSS
  useEffect(() => {
    try {
      document.body.classList.add('sidebar-visible');
    } catch (e) {}
    return () => {
      try {
        document.body.classList.remove('sidebar-visible');
      } catch (e) {}
    };
  }, []);

  const handleLogout = () => {
    try {
      // remove common auth keys (keep application data like employees)
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (e) {}
    try {
      document.body.classList.remove('sidebar-collapsed');
    } catch (e) {}
    setCollapsed(false);
    navigate('/');
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top d-flex align-items-center justify-content-between px-3">
        <div className="brand d-flex align-items-center gap-2">
          <div className="brand-icon">A</div>
          {!collapsed && <div className="brand-text">Accounting</div>}
        </div>
        <button
          className="toggle-btn"
          onClick={() => setCollapsed((s) => !s)}
          aria-label="Toggle sidebar"
          type="button"
        >
          {collapsed ? '>' : '<'}
        </button>
      </div>

      <nav className="nav flex-column mt-3 px-1">
        {menuItems.map((m) => {
          const active = location.pathname === m.to;
          return (
            <Link
              key={m.key}
              to={m.to}
              className={`nav-link d-flex align-items-center gap-2 my-1 px-3 ${active ? 'active' : ''}`}
            >
              <span className="nav-icon">{m.label.charAt(0)}</span>
              {!collapsed && <span className="nav-label">{m.label}</span>}
            </Link>
          );
        })}

        {/* Logout placed under Employee Management */}
        <button type="button" className="nav-link d-flex align-items-center gap-2 my-1 px-3" onClick={handleLogout}>
          <span className="nav-icon">⎋</span>
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </nav>

      <div className="sidebar-footer mt-auto px-3 mb-3">
        {!collapsed && <small className="text-muted">v0.1.0</small>}
      </div>
    </div>
  );
};

export default Sidebar;
