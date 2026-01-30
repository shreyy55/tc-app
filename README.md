# Multi-Tenant Next.js App (Frontend-Only POC)

A proof-of-concept frontend-only multi-tenant web application that uses subdomains to identify tenants. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Overview

This application demonstrates multi-tenancy using subdomain-based routing. Each tenant gets their own subdomain with customized UI and branding, all served from a single codebase.

### How It Works

```
customer1.shreyy.in → Shows Customer One's UI (Blue theme)
customer2.shreyy.in → Shows Customer Two's UI (Green theme)
customer3.shreyy.in → Shows Customer Three's UI (Purple theme)
shreyy.in           → Shows landing page
```

## Features

- ✅ **Subdomain Detection**: Automatic tenant identification via subdomain
- ✅ **Dynamic Theming**: Each tenant gets unique colors and branding
- ✅ **Middleware-based**: Uses Next.js middleware for efficient routing
- ✅ **Local Development**: Supports `*.localhost` subdomains for testing
- ✅ **No Backend**: Pure frontend implementation with in-memory config
- ✅ **TypeScript**: Fully typed codebase
- ✅ **Cloudflare Ready**: Works with wildcard DNS (*.shreyy.in)

## Architecture

### File Structure

```
tc-app/
├── middleware.ts                 # Tenant detection middleware
├── lib/
│   ├── tenant-config.ts         # In-memory tenant configuration
│   ├── tenant-utils.ts          # Subdomain parsing utilities
│   └── get-tenant.ts            # Server-side tenant getter
├── app/
│   ├── layout.tsx               # Root layout with dynamic theming
│   ├── page.tsx                 # Main page (landing + tenant views)
│   └── tenant-not-found/
│       └── page.tsx             # Error page for invalid tenants
└── README.md                     # This file
```

### How Subdomain Detection Works

1. **Middleware (`middleware.ts`)**:
   - Runs on every request
   - Extracts hostname from `request.headers.get("host")`
   - Parses subdomain using `parseTenantFromHost()`
   - Validates tenant against `TENANTS` config
   - Sets custom headers: `x-tenant-slug`, `x-is-root-domain`
   - Redirects to `/tenant-not-found` if tenant doesn't exist

2. **Tenant Utilities (`lib/tenant-utils.ts`)**:
   - `parseTenantFromHost(host)`: Parses subdomain from hostname
   - Handles different formats:
     - `customer1.shreyy.in` → `{ slug: "customer1" }`
     - `customer1.localhost:3000` → `{ slug: "customer1" }`
     - `shreyy.in` → `{ slug: null, isRootDomain: true }`
     - `www.shreyy.in` → `{ slug: null, isWww: true }`

3. **Tenant Config (`lib/tenant-config.ts`)**:
   - In-memory object storing tenant data
   - Each tenant has: name, theme, primaryColor, description
   - Easy to extend with more properties

4. **Get Tenant (`lib/get-tenant.ts`)**:
   - Server-side helper function
   - Reads headers set by middleware using `headers()`
   - Returns tenant slug and config
   - Used in Server Components (layouts, pages)

## Local Development

### Prerequisites

- Node.js 20.9.0+ (or Node.js 18+ with warnings)
- npm or yarn

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Test with subdomains**:

   The app supports `*.localhost` subdomains for local testing:

   - Root domain: http://localhost:3000
   - Customer 1: http://customer1.localhost:3000
   - Customer 2: http://customer2.localhost:3000
   - Customer 3: http://customer3.localhost:3000

   **Note**: Modern browsers natively support `*.localhost` subdomains without any hosts file modification.

### Testing Invalid Tenants

Try accessing a non-existent tenant:
```
http://invalid.localhost:3000
```

You should see the "Tenant Not Found" page.

## Adding New Tenants

To add a new tenant, simply update `lib/tenant-config.ts`:

```typescript
export const TENANTS: Record<string, TenantConfig> = {
  // ... existing tenants
  customer4: {
    name: "Customer Four",
    theme: "orange",
    primaryColor: "#f97316", // Tailwind orange-500
    description: "Welcome to Customer Four's workspace",
  },
};
```

No other changes needed! The middleware automatically validates new tenants.

## Production Deployment

### DNS Configuration

Set up wildcard DNS for your domain:

```
Type  Name        Value           TTL
A     @           <your-ip>       Auto
A     *           <your-ip>       Auto
```

Or with Cloudflare:

1. Add a wildcard CNAME record:
   ```
   Type   Name    Target              Proxy
   CNAME  *       shreyy.in           Proxied
   ```

2. Ensure "Automatic HTTPS Rewrites" is enabled

### Deployment Options

This app can be deployed to:

- **Vercel**: Automatically supports wildcard subdomains
- **Netlify**: Requires wildcard domain configuration
- **Cloudflare Pages**: Full support for wildcard routing
- **Custom server**: Works with any Node.js hosting

### Environment Considerations

- No environment variables needed (frontend-only)
- No backend configuration required
- No database setup needed

## Technical Details

### Next.js Features Used

- **App Router**: Modern routing system
- **Middleware**: Request-level tenant detection
- **Server Components**: Async data fetching for tenant info
- **Headers API**: Passing tenant context from middleware to pages

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Performance

- Middleware runs efficiently on edge
- No external API calls
- Static tenant configuration (instant lookups)
- Server-side rendering for optimal performance

## Limitations (By Design)

This is a **proof-of-concept** with intentional limitations:

- ❌ No authentication or user management
- ❌ No backend or database
- ❌ No persistent data storage
- ❌ No real tenant isolation (all data is in-memory)
- ❌ No admin panel for managing tenants

These are intentional omissions to keep the POC focused on subdomain-based multi-tenancy.

## Extending This POC

To turn this into a production app, you would add:

1. **Backend API**: Add Next.js API routes or external API
2. **Database**: Store tenant configs in Postgres/MongoDB
3. **Authentication**: Add NextAuth or similar
4. **User Management**: Per-tenant user systems
5. **Data Isolation**: Tenant-scoped database queries
6. **Admin Panel**: UI for managing tenants
7. **Custom Domains**: Allow tenants to use their own domains

## Troubleshooting

### Subdomains not working locally?

- Ensure you're using `*.localhost:3000` format
- Try a different browser if issues persist
- Check that the dev server is running on port 3000

### Tenant not found errors?

- Verify the subdomain matches a key in `TENANTS` config
- Check for typos in the URL
- Ensure middleware is running (check terminal logs)

### Theme colors not showing?

- Clear browser cache
- Check that Tailwind CSS is properly configured
- Verify `primaryColor` values in tenant config

## License

MIT License - Feel free to use this POC for learning or as a starting point for your own projects.

## Questions?

This is a proof-of-concept implementation. For production use cases, consider proper security, data isolation, and scalability requirements.
