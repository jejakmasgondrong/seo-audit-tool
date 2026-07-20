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
