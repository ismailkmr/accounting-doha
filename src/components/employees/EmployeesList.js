import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'employees';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setEmployees(parsed);
    } catch (e) {
      setEmployees([]);
    }
  }, []);

  const remove = (id) => {
    const filtered = employees.filter((e) => e.id !== id);
    setEmployees(filtered);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Employee Management</h2>
        <div>
          <Link to="/employees/new" className="btn btn-primary btn-sm">Add Employee</Link>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {employees.length === 0 ? (
            <div className="text-center py-5 text-muted">No employees yet. Click "Add Employee" to create one.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>GCC ID / Passport</th>
                    <th>Job Title</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, idx) => (
                    <tr key={emp.id}>
                      <td>{idx + 1}</td>
                      <td>{emp.fullName}</td>
                      <td>{emp.nationality}</td>
                      <td>{emp.gccId || emp.passportNumber}</td>
                      <td>{emp.jobTitle}</td>
                      <td className="text-end">
                        <Link to={`/employees/${emp.id}`} className="btn btn-sm btn-outline-primary me-2">View</Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => remove(emp.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
