import { useState } from 'react';
import axios from 'axios';

const CareerGuide = () => {
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!interests.trim()) return alert('Please enter your interests or favorite subjects.');

    setLoading(true);
    setSuggestions('Thinking...');

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `Suggest ideal career options for a student who is interested in: ${interests}. Provide clear, simple suggestions.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            key: import.meta.env.VITE_GEMINI_API_KEY,
          },
        }
      );

      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setSuggestions(text || '⚠️ No response received.');
    } catch (error) {
      console.error(error);
      setSuggestions('❌ Error fetching response from Gemini API.');
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
        background: 'linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <header style={{ padding: '60px 20px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#065f46', marginBottom: '10px' }}>
          🎯 Career Guide
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>
          Get AI-powered career suggestions based on your interests.
        </p>
      </header>

      <main style={{ flex: 1, padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="e.g., Math, Physics, Technology"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
            }}
          />
          <button
            onClick={handleGenerate}
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
            {loading ? 'Thinking...' : 'Suggest Careers'}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            minHeight: '150px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {suggestions}
        </div>
      </main>

      
    </div>
  );
};

export default CareerGuide;
