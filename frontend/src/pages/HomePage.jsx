import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-4xl w-full space-y-8">
          <section className="card text-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Notes App for Teams
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Simple note-taking with team workspaces. Start with our free plan 
                and upgrade when you need more storage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn btn-primary text-base px-6 py-3">
                Get Started
              </Link>
              <Link to="/notes" className="btn btn-secondary text-base px-6 py-3">
                Browse Notes
              </Link>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="card">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">What's Included</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Secure login system
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Team workspace isolation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Create, edit, and organize notes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Free plan with upgrade options
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Live system status monitoring
                </li>
              </ul>
            </section>

            <section className="card">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Demo Accounts</h2>
              <div className="space-y-3 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-slate-700">Acme Corp</p>
                  <p className="text-slate-600">admin@acme.test / password</p>
                  <p className="text-slate-600">user@acme.test / password</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium text-slate-700">Globex Inc</p>
                  <p className="text-slate-600">admin@globex.test / password</p>
                  <p className="text-slate-600">user@globex.test / password</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 bg-yellow-50 p-2 rounded border border-yellow-200">
                Need test data? Use "Seed Accounts" button on the login page
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
