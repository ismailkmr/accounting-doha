import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const STORAGE_KEY = 'employees';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const found = list.find((e) => e.id === id);
      setEmp(found || null);
    } catch (e) {
      setEmp(null);
    }
  }, [id]);

  if (!emp) return (
    <div className="container py-5">
      <div className="alert alert-warning">Employee not found.</div>
      <Link to="/employees" className="btn btn-sm btn-outline-primary">Back to list</Link>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">{emp.fullName}</h2>
        <Link to="/employees" className="btn btn-sm btn-outline-secondary">Back</Link>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Nationality:</strong> {emp.nationality}</p>
              <p><strong>GCC ID:</strong> {emp.gccId || '-'}</p>
              <p><strong>Passport:</strong> {emp.passportNumber || '-'}</p>
              <p><strong>Visa Status:</strong> {emp.visaStatus || '-'}</p>
              <p><strong>Visa Expiry:</strong> {emp.visaExpiry || '-'}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Mobile:</strong> {emp.mobile || '-'}</p>
              <p><strong>Email:</strong> {emp.email || '-'}</p>
              <p><strong>Job Title:</strong> {emp.jobTitle || '-'}</p>
              <p><strong>Start Date:</strong> {emp.startDate || '-'}</p>
              <p><strong>Salary:</strong> {emp.salary || '-'}</p>
            </div>
          </div>

          <hr />
          <p><strong>Address</strong></p>
          <p>{emp.address || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
