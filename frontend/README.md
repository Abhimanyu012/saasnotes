# Notes App Frontend

A clean, modern notes application built with React and Tailwind CSS.

## Features

- User authentication with workspace isolation
- Create, edit, and delete notes
- Responsive design
- Real-time API status monitoring
- Team plan management

## Getting Started

1. Make sure the backend server is running (usually on port 5000)
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to the localhost URL shown in terminal

## Demo Setup

Use the "Setup Demo Data" button on the login page to create test accounts:

**Acme Corp Team:**
- admin@acme.test / password (admin access)
- user@acme.test / password (standard user)

**Globex Inc Team:**
- admin@globex.test / password (admin access) 
- user@globex.test / password (standard user)

## Configuration

The app automatically proxies API calls to the backend. If your backend runs on a different port, update the proxy settings in `vite.config.js`.

## Build

Run `npm run build` to create a production build in the `dist/` folder.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
