'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setData(null);

    try {
      // Ensure URL has protocol
      const finalUrl = url.startsWith('http') ? url : `https://${url}`;
      
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-green-400">🔍 SEO Audit Tool</h1>
        <p className="text-gray-400 mb-6">Check basic SEO elements of any website. (Next.js + Web3 Ready)</p>
        
        <form onSubmit={handleAudit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., google.com)"
            className="flex-1 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 text-white"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded font-semibold disabled:opacity-50"
          >
            {loading ? 'Auditing...' : 'Audit'}
          </button>
        </form>

<p className="text-sm text-gray-400 leading-relaxed mb-6">
          This tool runs a quick on-page SEO scan for any public URL. Paste a
          website address, click Audit, and get an instant read on the page
          title, meta description, heading structure, Open Graph tags, and
          canonical URL. It is built for developers and SEO specialists who
          want a fast baseline check before publishing or optimizing a page.
        </p>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-400">
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <h2 className="font-semibold text-green-400 mb-1">On-Page Elements</h2>
            <p>
              Verifies title, meta description, H1 presence, Open Graph title,
              and canonical URL handling in a single request.
            </p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <h2 className="font-semibold text-green-400 mb-1">No Sign-up Needed</h2>
            <p>
              Free and open to everyone. Ideal for smoke-testing your pages
              during development or before shipping to production.
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          Why audit? Most SEO problems are easy to fix once you can see them:
          a missing meta description hurts click-through rates, an empty title
          confuses search engines, and a broken canonical can split your page
          ranking between duplicate URLs. Running a quick check before you
          deploy helps you catch these issues while they are still cheap to
          correct. For deeper analysis, pair this tool with a full site crawl
          and review your robots.txt and sitemap, then focus on content quality
          and page speed as the next layer of optimization.
        </p>

        {error && <p className="text-red-400 mb-4">Error: {error}</p>}

        {data && (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-3">
            <h2 className="text-xl font-bold text-green-400 mb-4">Audit Results</h2>
            <div><span className="text-gray-400">Title:</span> <p className="font-medium">{data.title}</p></div>
            <div><span className="text-gray-400">Description:</span> <p className="font-medium">{data.description}</p></div>
            <div><span className="text-gray-400">H1:</span> <p className="font-medium">{data.h1}</p></div>
            <div><span className="text-gray-400">OG Title:</span> <p className="font-medium">{data.ogTitle}</p></div>
            <div><span className="text-gray-400">Canonical:</span> <p className="font-medium break-all">{data.canonical}</p></div>
          </div>
        )}
      </div>
    </main>
  );
}
