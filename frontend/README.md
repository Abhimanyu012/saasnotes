# Frontend

React + Vite + Tailwind for the Notes SaaS demo.

- Auth: POST /api/auth/login, stores JWT in localStorage
- Notes: CRUD at /api/notes (JWT required)
- Tenant: Admins can POST /api/tenants/:slug/upgrade to lift note limit

Quickstart

1. Run the backend on port 5000, or set VITE_API_BASE to your API.
2. Seed test data once: open the Login page and click "Seed Accounts".
3. Start dev server.

Environment

- VITE_API_BASE (optional). Defaults to "/api" and uses Vite proxy when configured.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
