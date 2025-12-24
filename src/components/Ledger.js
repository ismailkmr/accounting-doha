import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ledger.css';

const sample = [
  { id: 1, date: '2025-12-01', ref: 'INV-1001', particulars: 'Sales A/C', debit: 0, credit: 1500 },
  { id: 2, date: '2025-12-02', ref: 'PUR-2001', particulars: 'Purchase A/C', debit: 900, credit: 0 },
  { id: 3, date: '2025-12-05', ref: 'RCV-3001', particulars: 'Cash A/C', debit: 0, credit: 500 },
];

export default function Ledger() {
  const [rows, setRows] = useState(sample);
  const [query, setQuery] = useState('');

  const filtered = rows.filter(
    (r) =>
      r.particulars.toLowerCase().includes(query.toLowerCase()) ||
      r.ref.toLowerCase().includes(query.toLowerCase())
  );

  const totalDr = filtered.reduce((s, r) => s + (Number(r.debit) || 0), 0);
  const totalCr = filtered.reduce((s, r) => s + (Number(r.credit) || 0), 0);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">Ledger</h3>
        <div>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">Back</Link>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body d-flex gap-2 flex-column flex-md-row align-items-start align-items-md-center">
          <div className="flex-grow-1 w-100">
            <input
              type="text"
              className="form-control"
              placeholder="Search by particulars or ref"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary ms-0 ms-md-2">Add Transaction</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th style={{width: '110px'}}>Date</th>
                <th>Ref</th>
                <th>Particulars</th>
                <th className="text-end" style={{width: '120px'}}>Debit</th>
                <th className="text-end" style={{width: '120px'}}>Credit</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.ref}</td>
                  <td>{r.particulars}</td>
                  <td className="text-end">{r.debit ? r.debit.toFixed(2) : ''}</td>
                  <td className="text-end">{r.credit ? r.credit.toFixed(2) : ''}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="table-light">
              <tr>
                <th colSpan={3} className="text-end">Totals</th>
                <th className="text-end">{totalDr.toFixed(2)}</th>
                <th className="text-end">{totalCr.toFixed(2)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
