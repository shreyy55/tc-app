/**
 * Tenant Utilities
 * 
 * Functions for parsing and extracting tenant information from hostnames.
 */

export interface TenantInfo {
  slug: string | null;
  isRootDomain: boolean;
  isWww: boolean;
}

/**
 * Parse tenant slug from hostname
 * 
 * Examples:
 * - customer1.shreyy.in → { slug: "customer1", isRootDomain: false, isWww: false }
 * - customer1.localhost:3000 → { slug: "customer1", isRootDomain: false, isWww: false }
 * - shreyy.in → { slug: null, isRootDomain: true, isWww: false }
 * - www.shreyy.in → { slug: null, isRootDomain: true, isWww: true }
 * - localhost:3000 → { slug: null, isRootDomain: true, isWww: false }
 */
export function parseTenantFromHost(host: string): TenantInfo {
  // Remove port if present (e.g., localhost:3000 → localhost)
  const hostname = host.split(":")[0];
  
  // Split hostname into parts
  const parts = hostname.split(".");
  
  // Handle different cases
  
  // Case 1: localhost (no subdomain)
  if (hostname === "localhost") {
    return {
      slug: null,
      isRootDomain: true,
      isWww: false,
    };
  }
  
  // Case 2: subdomain.localhost (local development)
  if (parts.length === 2 && parts[1] === "localhost") {
    const subdomain = parts[0];
    
    // www.localhost is treated as root domain
    if (subdomain === "www") {
      return {
        slug: null,
        isRootDomain: true,
        isWww: true,
      };
    }
    
    return {
      slug: subdomain,
      isRootDomain: false,
      isWww: false,
    };
  }
  
  // Case 3: domain.tld (root domain, e.g., shreyy.in)
  if (parts.length === 2) {
    return {
      slug: null,
      isRootDomain: true,
      isWww: false,
    };
  }
  
  // Case 4: subdomain.domain.tld (tenant subdomain, e.g., customer1.shreyy.in)
  if (parts.length >= 3) {
    const subdomain = parts[0];
    
    // www.domain.tld is treated as root domain
    if (subdomain === "www") {
      return {
        slug: null,
        isRootDomain: true,
        isWww: true,
      };
    }
    
    return {
      slug: subdomain,
      isRootDomain: false,
      isWww: false,
    };
  }
  
  // Fallback: treat as root domain
  return {
    slug: null,
    isRootDomain: true,
    isWww: false,
  };
}

/**
 * Extract tenant slug from hostname (convenience function)
 */
export function getTenantSlug(host: string): string | null {
  return parseTenantFromHost(host).slug;
}
