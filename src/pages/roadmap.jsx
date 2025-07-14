import { useState, useRef } from 'react';
import axios from 'axios';
import { toPng } from 'html-to-image';

const RoadmapGenerator = () => {
  const [topic, setTopic] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const roadmapRef = useRef();

  const handleGenerate = async () => {
    if (!topic.trim()) return alert('Enter a topic.');
    setLoading(true);
    setRoadmap('Generating roadmap...');

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [{ parts: [{ text: `Create a step-by-step learning roadmap for "${topic}". Make it motivational and structured.` }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: { key: import.meta.env.VITE_GEMINI_API_KEY },
        }
      );

      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setRoadmap(text || '⚠️ No roadmap generated.');
    } catch (err) {
      console.error(err);
      setRoadmap('❌ Failed to generate roadmap.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!roadmapRef.current) return;
    try {
      const dataUrl = await toPng(roadmapRef.current);
      const link = document.createElement('a');
      link.download = `${topic}-roadmap.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Image download failed', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <header style={{ padding: '60px 20px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#065f46', marginBottom: '10px' }}>
          🗺️ AI Roadmap Generator
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>
          Generate a step-by-step learning roadmap with AI & download as image.
        </p>
      </header>

      <main style={{ flex: 1, padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Enter a topic (e.g., Web Development)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div
          ref={roadmapRef}
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            minHeight: '150px',
            whiteSpace: 'pre-wrap',
            fontSize: '1rem',
            color: '#1e293b',
          }}
        >
          {roadmap}
        </div>

        {roadmap && !loading && (
          <button
            onClick={handleDownloadImage}
            style={{
              marginTop: '20px',
              padding: '10px 24px',
              backgroundColor: '#065f46',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            📥 Download as Image
          </button>
        )}
      </main>

      <footer
        style={{
          background: '#10b981',
          color: '#fff',
          textAlign: 'center',
          padding: '16px 0',
          marginTop: 'auto',
          fontSize: '0.95rem',
        }}
      >
        &copy; {new Date().getFullYear()} AI Study Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default RoadmapGenerator;
