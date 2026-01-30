import { NextRequest, NextResponse } from "next/server";
import { parseTenantFromHost } from "./lib/tenant-utils";
import { tenantExists } from "./lib/tenant-config";

/**
 * Middleware: Tenant Detection via Subdomain
 * 
 * This middleware runs on every request and:
 * 1. Extracts the hostname from the request
 * 2. Parses the tenant slug from the subdomain
 * 3. Sets custom headers with tenant information
 * 4. Redirects to tenant-not-found page if tenant is invalid
 * 
 * The tenant information is passed to pages/layouts via headers,
 * which can be read using the `headers()` function in Server Components.
 */

export function middleware(request: NextRequest) {
  // Get hostname from request headers
  const host = request.headers.get("host") || "";
  
  // Parse tenant information from hostname
  const tenantInfo = parseTenantFromHost(host);
  
  // Clone the request headers to add custom tenant headers
  const requestHeaders = new Headers(request.headers);
  
  // If this is the root domain, allow it to show the landing page
  if (tenantInfo.isRootDomain) {
    requestHeaders.set("x-tenant-slug", "");
    requestHeaders.set("x-is-root-domain", "true");
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // If we have a tenant slug, validate it
  if (tenantInfo.slug) {
    // Check if the tenant exists in our configuration
    if (!tenantExists(tenantInfo.slug)) {
      // Tenant not found - redirect to a not-found page
      // We pass the invalid slug as a query parameter
      const url = request.nextUrl.clone();
      url.pathname = "/tenant-not-found";
      url.searchParams.set("slug", tenantInfo.slug);
      
      return NextResponse.rewrite(url);
    }
    
    // Valid tenant - set custom headers
    requestHeaders.set("x-tenant-slug", tenantInfo.slug);
    requestHeaders.set("x-is-root-domain", "false");
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  // Fallback: treat as root domain
  requestHeaders.set("x-tenant-slug", "");
  requestHeaders.set("x-is-root-domain", "true");
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * Middleware Configuration
 * 
 * This matcher ensures the middleware runs on all routes except:
 * - Static files (_next/static)
 * - Image optimization (_next/image)
 * - Favicon
 * - Public files
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
