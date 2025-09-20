// Simple auth storage helpers
export function getToken() {
  return localStorage.getItem('token') || '';
}

export function setAuth({ token, role, tenantSlug }) {
  if (token) localStorage.setItem('token', token);
  if (role) localStorage.setItem('role', role);
  if (tenantSlug) localStorage.setItem('tenantSlug', tenantSlug);
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('tenantSlug');
}

export function getRole() {
  return localStorage.getItem('role') || '';
}

export function getTenantSlug() {
  return localStorage.getItem('tenantSlug') || '';
}

export function isAuthed() {
  return !!getToken();
}
