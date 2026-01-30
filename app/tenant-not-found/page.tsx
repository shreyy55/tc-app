/**
 * Tenant Not Found Page
 */

export default async function TenantNotFound({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const params = await searchParams;
  const tenantSlug = params.slug || "unknown";
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-200">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              Tenant Not Found
            </h1>
            <div className="mb-6">
              <p className="text-lg text-gray-600 mb-4">
                We couldn&apos;t find a Trust Center for:
              </p>
              <code className="inline-block bg-gray-100 px-6 py-3 rounded-lg text-xl font-semibold text-gray-900 border border-gray-300">
                {tenantSlug}
              </code>
            </div>
            <p className="text-gray-600 leading-relaxed">
              This organization may not have set up their Trust Center yet, or the URL might be incorrect. 
              Please verify the subdomain and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
