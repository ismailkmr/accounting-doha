import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const sampleData = [
  { id: 1, vendor: 'Office Supplies Co.', date: '2025-12-01', amount: 1250.5 },
  { id: 2, vendor: 'ACME Wholesale', date: '2025-12-05', amount: 4300.0 },
  { id: 3, vendor: 'Stationery Mart', date: '2025-12-12', amount: 760.75 },
];

const PurchaseReport = () => {
  const total = sampleData.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Purchase Report</h2>
        <small className="text-muted">Summary of recent purchases</small>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vendor</th>
                  <th>Date</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.vendor}</td>
                    <td>{r.date}</td>
                    <td className="text-end">{r.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="3" className="text-end">Total</th>
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

export default PurchaseReport;
