import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import { isAuthed } from './lib/auth.js';

function RequireAuth({ children }) {
  return isAuthed() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/notes"
          element={
            <RequireAuth>
              <NotesPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
