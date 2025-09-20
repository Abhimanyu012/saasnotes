import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext({ notify: () => {} });

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const notify = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastCtx.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`card shadow-lg border ${
              t.type === 'error' ? 'border-red-300 bg-red-50' : t.type === 'success' ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
            }`}
          >
            <p className="text-sm">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
