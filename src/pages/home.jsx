import React from 'react';

const Home = () => {
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
      <header
        style={{
          padding: '60px 20px 30px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            color: '#1e293b',
            marginBottom: '10px',
            fontWeight: 700,
          }}
        >
          Welcome to <span style={{ color: '#6366f1' }}>AI Study Dashboard</span>
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#334155',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          A smart academic assistant powered by AI to help you learn better, faster, and smarter.
        </p>
      </header>

      {/* Main Content */}
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
            transition: 'transform 0.3s',
          }}
        >
          <h2
            style={{
              color: '#4f46e5',
              fontSize: '2rem',
              marginBottom: '16px',
            }}
          >
            What can you do here?
          </h2>
          <ul
            style={{
              textAlign: 'left',
              color: '#475569',
              fontSize: '1rem',
              lineHeight: '1.8',
              margin: '0 auto',
              paddingLeft: '20px',
              maxWidth: '480px',
            }}
          >
            <li>📘 Get AI explanations of any topic</li>
            <li>🎯 Plan your studies with smart suggestions</li>
            <li>🎥 Watch YouTube videos based on what you're learning</li>
            <li>🧠 Take quizzes to test your understanding</li>
            <li>🚀 Discover careers and skill roadmaps</li>
          </ul>
        </div>
      </main>

      
    </div>
  );
};

export default Home;
