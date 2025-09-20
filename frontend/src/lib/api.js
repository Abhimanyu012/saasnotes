import { getToken, getTenantSlug } from './auth';

const BASE = import.meta.env.VITE_API_BASE || '/api';

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
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  seed: () => request('/auth/seed'),
  // Health
  health: () => request('/health'),
  // Notes
  listNotes: () => request('/notes'),
  createNote: (note) => request('/notes', { method: 'POST', body: note }),
  updateNote: (id, note) => request(`/notes/${id}`, { method: 'PUT', body: note }),
  deleteNote: (id) => request(`/notes/${id}`, { method: 'DELETE' }),
  // Tenant
  upgradeTenant: (slug) => request(`/tenants/${slug}/upgrade`, { method: 'POST' }),
};

export default api;
