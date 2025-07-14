import { useState } from 'react';
import axios from 'axios';

const StudyAssistant = () => {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return alert('Please enter a topic.');
    setLoading(true);
    setResponse('Thinking...');

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `Explain "${topic}" in simple terms for a student.`,
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

      const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setResponse(text || '⚠️ No response received.');
    } catch (error) {
      console.error(error);
      setResponse('❌ Error fetching response from Gemini API.');
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
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Header */}
      <header style={{ padding: '60px 20px 30px', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#1e293b',
            marginBottom: '10px',
            fontWeight: 700,
          }}
        >
          📚 AI Study Assistant
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>
          Get simple explanations of any topic powered by Gemini AI.
        </p>
      </header>

      {/* Main Section */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            background: '#fff',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Enter a topic (e.g., Photosynthesis)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleGenerate()}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
              marginBottom: '16px',
            }}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
              marginBottom: '24px',
            }}
          >
            {loading ? 'Generating...' : 'Generate Summary'}
          </button>

          <div
            style={{
              backgroundColor: '#f4f4f4',
              padding: '16px',
              borderRadius: '10px',
              textAlign: 'left',
              minHeight: '150px',
              maxHeight: '400px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              color: '#334155',
              fontSize: '1rem',
              lineHeight: '1.6',
            }}
          >
            {response}
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default StudyAssistant;
