import { headers } from "next/headers";
import { getTenantConfig, type TenantConfig } from "./tenant-config";

/**
 * Server-side helper to get current tenant information
 * 
 * This function reads the custom headers set by the middleware
 * and returns the tenant configuration.
 * 
 * Can only be used in Server Components.
 */
export async function getTenant(): Promise<{
  slug: string | null;
  config: TenantConfig | null;
  isRootDomain: boolean;
}> {
  const headersList = await headers();
  
  const tenantSlug = headersList.get("x-tenant-slug") || "";
  const isRootDomain = headersList.get("x-is-root-domain") === "true";
  
  if (!tenantSlug || isRootDomain) {
    return {
      slug: null,
      config: null,
      isRootDomain: true,
    };
  }
  
  const config = getTenantConfig(tenantSlug);
  
  return {
    slug: tenantSlug,
    config,
    isRootDomain: false,
  };
}
