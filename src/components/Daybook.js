import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Daybook.css';

const emptyEntry = { date: '', account: '', description: '', debit: '', credit: '' };

export default function Daybook() {
  const [entry, setEntry] = useState(emptyEntry);
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((s) => ({ ...s, [name]: value }));
  };

  const addEntry = (e) => {
    e.preventDefault();
    if (!entry.date || (!entry.debit && !entry.credit) || !entry.account) return;
    const newEntry = { ...entry, id: Date.now() };
    setEntries((s) => [newEntry, ...s]);
    setEntry(emptyEntry);
  };

  const removeEntry = (id) => setEntries((s) => s.filter((r) => r.id !== id));

  const formatAmount = (v) => {
    if (!v) return '';
    const n = Number(v);
    if (Number.isNaN(n)) return v;
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const totalDebit = entries.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
  const totalCredit = entries.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);
  const q = (query || '').trim().toLowerCase();
  const filtered = q
    ? entries.filter((r) => {
        return (
          (r.account && r.account.toLowerCase().includes(q)) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          (r.date && r.date.includes(q)) ||
          (r.debit && String(r.debit).toLowerCase().includes(q)) ||
          (r.credit && String(r.credit).toLowerCase().includes(q))
        );
      })
    : entries;
  const filteredDebit = filtered.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
  const filteredCredit = filtered.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">Day Book</h3>
        <div>
          <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">Back</Link>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-2 align-items-end" onSubmit={addEntry}>
            <div className="col-12 col-md-2">
              <label className="form-label">Date</label>
              <input name="date" value={entry.date} onChange={handleChange} type="date" className="form-control" />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Account</label>
              <input name="account" value={entry.account} onChange={handleChange} className="form-control" placeholder="Account name" />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label">Description</label>
              <input name="description" value={entry.description} onChange={handleChange} className="form-control" placeholder="Narration" />
            </div>

            <div className="col-5 col-md-1-5 debit-col">
              <label className="form-label">Debit</label>
              <input name="debit" value={entry.debit} onChange={handleChange} className="form-control form-control-sm text-end" placeholder="0.00" />
            </div>

            <div className="col-5 col-md-1-5 credit-col">
              <label className="form-label">Credit</label>
              <input name="credit" value={entry.credit} onChange={handleChange} className="form-control form-control-sm text-end" placeholder="0.00" />
            </div>

            <div className="col-12 col-md-2">
              <button className="btn btn-primary w-100" type="submit">Add Entry</button>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="mb-3 row gx-2 align-items-center">
            <div className="col-auto">
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search by account, description, date or amount"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setQuery('')}>Clear</button>
            </div>
            <div className="col text-end text-muted small">Showing {filtered.length} of {entries.length} entries</div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: '110px'}}>Date</th>
                  <th>Account</th>
                  <th>Description</th>
                  <th className="text-end" style={{width: '120px'}}>Debit</th>
                  <th className="text-end" style={{width: '120px'}}>Credit</th>
                  <th style={{width: '90px'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-4 text-muted">No entries yet — add one above.</td></tr>
                )}
                {entries.length > 0 && filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-4 text-muted">No entries match your search.</td></tr>
                )}
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>{r.account}</td>
                    <td>{r.description}</td>
                    <td className="text-end">{formatAmount(r.debit)}</td>
                    <td className="text-end">{formatAmount(r.credit)}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeEntry(r.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-light">
                <tr>
                  <th colSpan={3} className="text-end">Totals (shown)</th>
                  <th className="text-end">{formatAmount(filteredDebit)}</th>
                  <th className="text-end">{formatAmount(filteredCredit)}</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
