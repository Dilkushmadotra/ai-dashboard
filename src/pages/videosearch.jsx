import { useState } from 'react';
import axios from 'axios';

const VideoSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          q: query,
          part: 'snippet',
          maxResults: 8,
          type: 'video',
        },
      });

      setVideos(res.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
      alert('Failed to load videos. Please try again.');
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
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <header style={{ padding: '60px 20px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '10px' }}>🎥 Learn with Videos</h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>Find helpful YouTube videos for any topic.</p>
      </header>

      <main style={{ flex: 1, padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter a topic (e.g., Photosynthesis)"
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
              backgroundColor: '#f43f5e',
              color: '#fff',
              border: 'none',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {videos.length > 0 && (
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
            {videos.map((video) => (
              <div key={video.id.videoId} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noreferrer">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    style={{ width: '100%' }}
                  />
                  <div style={{ padding: '10px', color: '#334155', fontWeight: '500' }}>
                    {video.snippet.title.length > 60
                      ? video.snippet.title.slice(0, 57) + '...'
                      : video.snippet.title}
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      
    </div>
  );
};

export default VideoSearch;
