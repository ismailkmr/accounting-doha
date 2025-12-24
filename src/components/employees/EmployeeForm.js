import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'employees';

const empty = {
  fullName: '',
  nationality: '',
  gccId: '',
  passportNumber: '',
  visaStatus: '',
  visaExpiry: '',
  mobile: '',
  email: '',
  address: '',
  jobTitle: '',
  startDate: '',
  salary: '',
};

const EmployeeForm = () => {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation: name and either GCC ID or passport
    if (!form.fullName.trim()) return setError('Full name is required');
    if (!form.gccId.trim() && !form.passportNumber.trim()) return setError('GCC ID or Passport number is required');

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const id = Date.now().toString();
      const newEmp = { id, ...form };
      const updated = [newEmp, ...list];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      navigate('/employees');
    } catch (err) {
      setError('Failed to save employee');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Add Employee</h2>
        <small className="text-muted">GCC-style registration</small>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Nationality</label>
                <input name="nationality" value={form.nationality} onChange={handleChange} className="form-control" />
              </div>

              <div className="col-md-4">
                <label className="form-label">GCC ID</label>
                <input name="gccId" value={form.gccId} onChange={handleChange} className="form-control" placeholder="e.g. 123456789012" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Passport Number</label>
                <input name="passportNumber" value={form.passportNumber} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Visa Status</label>
                <input name="visaStatus" value={form.visaStatus} onChange={handleChange} className="form-control" placeholder="e.g. Residency" />
              </div>

              <div className="col-md-4">
                <label className="form-label">Visa Expiry</label>
                <input type="date" name="visaExpiry" value={form.visaExpiry} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Mobile</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} className="form-control" placeholder="+971 5X XXX XXXX" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="form-control" type="email" />
              </div>

              <div className="col-12">
                <label className="form-label">Address</label>
                <input name="address" value={form.address} onChange={handleChange} className="form-control" />
              </div>

              <div className="col-md-4">
                <label className="form-label">Job Title</label>
                <input name="jobTitle" value={form.jobTitle} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Start Date</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-4">
                <label className="form-label">Salary</label>
                <input name="salary" value={form.salary} onChange={handleChange} className="form-control" type="number" />
              </div>

              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/employees')}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Employee</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
