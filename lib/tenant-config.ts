/**
 * Tenant Configuration
 * 
 * This is an in-memory tenant configuration object.
 * Each tenant is identified by a subdomain slug.
 */

export interface TenantConfig {
  name: string;
  theme: string;
  primaryColor: string;
  description: string;
}

export const TENANTS: Record<string, TenantConfig> = {
  customer1: {
    name: "Customer One",
    theme: "blue",
    primaryColor: "#3b82f6", // Tailwind blue-500
    description: "Welcome to Customer One's workspace",
  },
  customer2: {
    name: "Customer Two",
    theme: "green",
    primaryColor: "#10b981", // Tailwind green-500
    description: "Welcome to Customer Two's workspace",
  },
  customer3: {
    name: "Customer Three",
    theme: "purple",
    primaryColor: "#8b5cf6", // Tailwind purple-500
    description: "Welcome to Customer Three's workspace",
  },
};

/**
 * Get tenant configuration by slug
 */
export function getTenantConfig(slug: string): TenantConfig | null {
  return TENANTS[slug] || null;
}

/**
 * Check if a tenant exists
 */
export function tenantExists(slug: string): boolean {
  return slug in TENANTS;
}
