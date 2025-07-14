import { useState } from 'react';
import axios from 'axios';

const SmartSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: import.meta.env.VITE_GOOGLE_CSE_API_KEY,
          cx: import.meta.env.VITE_GOOGLE_CSE_ID,
          q: query,
        },
      });

      setResults(res.data.items || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #fff1f2 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <header style={{ padding: '60px 20px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '10px' }}>🔎 Smart Search</h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>Find trusted resources from the web on any topic.</p>
      </header>

      <main style={{ flex: 1, padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Enter a search query (e.g., Laws of Motion)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
            }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {results.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {results.map((item, index) => (
              <li
                key={index}
                style={{
                  background: '#fff',
                  padding: '16px',
                  marginBottom: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '1.1rem',
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '600',
                  }}
                >
                  {item.title}
                </a>
                <p style={{ fontSize: '0.95rem', color: '#475569', marginTop: '6px' }}>
                  {item.snippet}
                </p>
                <small style={{ color: '#64748b' }}>{item.link}</small>
              </li>
            ))}
          </ul>
        )}
      </main>

      
    </div>
  );
};

export default SmartSearch;
