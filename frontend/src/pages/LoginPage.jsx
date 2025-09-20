import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import api from '../lib/api';
import { setAuth } from '../lib/auth';
import { useToast } from '../components/ToastProvider.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@acme.test');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login(email, password);
      setAuth(res);
      notify('Welcome back!', 'success');
      navigate('/notes');
    } catch (err) {
      notify(`Login failed: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function seed() {
    try {
      const r = await api.seed();
      notify('Demo accounts created successfully', 'success');
    } catch (e) {
      notify(`Setup failed: ${e.message}`, 'error');
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full">
          <form onSubmit={onSubmit} className="card space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
              <p className="text-slate-600 mt-2">Access your workspace</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input 
                  className="input" 
                  type="email" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  placeholder="your.email@company.com"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input 
                  className="input" 
                  type="password" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  placeholder="Enter password"
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                className="btn btn-primary w-full" 
                disabled={loading} 
                type="submit"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              
              <button 
                className="btn btn-secondary w-full" 
                type="button" 
                onClick={seed}
              >
                Setup Demo Data
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-slate-500 bg-blue-50 p-3 rounded border border-blue-200">
                Try <strong>admin@acme.test</strong> with <strong>password</strong>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
