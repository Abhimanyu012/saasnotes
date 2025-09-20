# Backend - Multi-Tenant SaaS Notes App

## Multi-Tenancy Approach

This application uses a **shared schema** approach for multi-tenancy. All relevant collections (users, notes) include a `tenantId` field referencing the tenant. This ensures strict data isolation: data belonging to one tenant cannot be accessed by another. All queries and mutations are scoped by `tenantId`.

Tenants supported: Acme, Globex.

Other approaches considered: schema-per-tenant, database-per-tenant. Shared schema was chosen for simplicity and scalability in a SaaS context.

## Endpoints
- `/api/auth/login` - JWT login
- `/api/auth/seed` - Seed tenants and users
- `/api/notes` - CRUD notes (tenant isolated)
- `/api/tenants/:slug/upgrade` - Upgrade plan (admin only)
- `/api/health` - Health check

## Plans
- Free: Max 3 notes per tenant
- Pro: Unlimited notes

## Roles
- Admin: Invite users, upgrade subscription
- Member: CRUD notes only
