import { getToken, getTenantSlug } from './auth';
import { API_BASE_URL } from '../config/api';

const BASE = import.meta.env.VITE_API_URL || API_BASE_URL;

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (data && data.error) || res.statusText || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

// Auth
export const api = {
  login: (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } }),
  seed: () => request('/api/auth/seed'),
  // Health
  health: () => request('/api/health'),
  // Notes
  listNotes: () => request('/api/notes'),
  createNote: (note) => request('/api/notes', { method: 'POST', body: note }),
  updateNote: (id, note) => request(`/api/notes/${id}`, { method: 'PUT', body: note }),
  deleteNote: (id) => request(`/api/notes/${id}`, { method: 'DELETE' }),
  // Tenant
  upgradeTenant: (slug) => request(`/api/tenants/${slug}/upgrade`, { method: 'POST' }),
};

export default api;
