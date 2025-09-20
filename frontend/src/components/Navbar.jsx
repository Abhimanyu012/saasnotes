import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { clearAuth, getTenantSlug, getRole, isAuthed } from '../lib/auth';

export default function Navbar() {
  const [status, setStatus] = useState('checking');
  const [plan, setPlan] = useState('');
  const role = getRole();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    api
      .health()
      .then(() => mounted && setStatus('ok'))
      .catch(() => mounted && setStatus('down'));
    return () => (mounted = false);
  }, [location.pathname]);

  // Plan indicator is best effort: inferred via note creation errors; left blank initially
  useEffect(() => {
    setPlan('');
  }, [location.pathname]);

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <header className="border-b border-white/20 bg-white/95 backdrop-blur-lg shadow-lg">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-blue-900 hover:text-blue-800 transition-colors duration-200">
            📝 Notes SaaS
          </Link>
          {isAuthed() && (
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              <Link className="text-slate-600 hover:text-blue-900 hover:underline transition-colors duration-200" to="/notes">
                My Notes
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge ${status === 'ok' ? 'badge-success' : status === 'down' ? 'badge-error' : 'badge-default'}`}>
            {status === 'ok' ? '✅ API: OK' : status === 'down' ? '❌ API: DOWN' : '⏳ API: …'}
          </span>
          {plan && <span className="badge badge-info">Plan: {plan}</span>}
          {isAuthed() ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 hidden sm:block bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {getTenantSlug()} • {role}
              </span>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
