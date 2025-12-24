import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const cards = [
  { title: 'Day Book', link: '/daybook', text: 'Open day book entries' },
  { title: 'Purchase Report', link: '/purchase-report', text: 'View purchase summaries' },
  { title: 'Sales Report', link: '/sales-report', text: 'View sales summaries' },
  { title: 'Employee Management', link: '/employees', text: 'Manage employee records' },
];

const Dashboard = () => {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Dashboard</h2>
        <small className="text-muted">Welcome back</small>
      </div>

      <div className="row g-4">
        {cards.map((c) => (
          <div key={c.title} className="col-12 col-sm-6 col-lg-3">
            <Link to={c.link} className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{c.title}</h5>
                    <p className="card-text text-muted">{c.text}</p>
                  </div>
                  <div className="mt-3">
                    <span className="btn btn-outline-primary btn-sm">Open</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
