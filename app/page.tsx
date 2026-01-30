import { headers } from "next/headers";
import { getTenant } from "@/lib/get-tenant";
import { TENANTS } from "@/lib/tenant-config";

/**
 * Home Page - Trust Center
 */
export default async function Home() {
  const tenant = await getTenant();
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  
  // Root domain - show list of known tenants
  if (tenant.isRootDomain) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">
              Trust Center Platform
            </h1>
            <p className="text-xl text-gray-600">Access security and compliance information</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Available Organizations
            </h2>
            <div className="grid gap-4">
              {Object.entries(TENANTS).map(([slug, config]) => (
                <a
                  key={slug}
                  href={`http://${slug}.${host}`}
                  className="flex items-center gap-4 p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white"
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
                    <p className="text-sm text-gray-500">{slug}.{host}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Tenant detected
  const { config, slug } = tenant;
  const isKnownTenant = config !== null;
  
  if (!isKnownTenant) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-semibold text-gray-900 capitalize">{slug}</h1>
          </div>
        </header>
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-12 border border-gray-200">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Welcome to {slug}&apos;s Trust Center
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your security and compliance hub. Get started building your workspace.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Known tenant - full page UI
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="bg-white border-b shadow-sm"
        style={{ 
          borderBottomColor: config.primaryColor + '30'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg"
              style={{ backgroundColor: config.primaryColor }}
            />
            <h1 className="text-2xl font-semibold text-gray-900">{config.name}</h1>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(to bottom, ${config.primaryColor}08, transparent)`
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Welcome to {config.name}&apos;s Trust Center
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore our security practices, compliance certifications, and privacy policies. 
              We&apos;re committed to keeping your data safe and secure.
            </p>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Security Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: config.primaryColor + '15' }}
            >
              <svg className="w-6 h-6" style={{ color: config.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Security</h3>
            <p className="text-gray-600 leading-relaxed">
              Enterprise-grade security measures to protect your data at every layer.
            </p>
          </div>
          
          {/* Compliance Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: config.primaryColor + '15' }}
            >
              <svg className="w-6 h-6" style={{ color: config.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Compliance</h3>
            <p className="text-gray-600 leading-relaxed">
              Certified and compliant with industry-leading standards and regulations.
            </p>
          </div>
          
          {/* Privacy Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: config.primaryColor + '15' }}
            >
              <svg className="w-6 h-6" style={{ color: config.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Privacy</h3>
            <p className="text-gray-600 leading-relaxed">
              Transparent data practices and respect for user privacy at our core.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
