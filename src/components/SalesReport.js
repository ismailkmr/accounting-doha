import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const sampleSales = [
  { id: 101, customer: 'Green Grocers', invoice: 'INV-2025-101', date: '2025-12-02', amount: 980.0 },
  { id: 102, customer: 'Tech Supplies Ltd.', invoice: 'INV-2025-102', date: '2025-12-08', amount: 2745.5 },
  { id: 103, customer: 'Fresh Farm Co.', invoice: 'INV-2025-103', date: '2025-12-15', amount: 430.25 },
];

const SalesReport = () => {
  const total = sampleSales.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Sales Report</h2>
        <small className="text-muted">Recent sales summary</small>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sampleSales.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.customer}</td>
                    <td>{r.invoice}</td>
                    <td>{r.date}</td>
                    <td className="text-end">{r.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4" className="text-end">Total</th>
                  <th className="text-end">{total.toFixed(2)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
