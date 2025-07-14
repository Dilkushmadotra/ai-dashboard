import { useState } from 'react';
import axios from 'axios';

const StudyPlanner = () => {
  const [subject, setSubject] = useState('');
  const [days, setDays] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (!subject || !days || !hoursPerDay) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setPlan('Generating your plan...');

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [
            {
              parts: [
                {
                  text: `Create a detailed ${days}-day study plan for the subject "${subject}".
The student can study ${hoursPerDay} hours per day. Provide a realistic and motivating daily breakdown.`,
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

      const responseText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setPlan(responseText || '⚠️ No plan received.');
    } catch (error) {
      console.error(error);
      setPlan('❌ Failed to generate study plan.');
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
        background: 'linear-gradient(135deg, #e0f7fa 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <header style={{ padding: '60px 20px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>
          🗓️ Study Planner
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>
          Get your personalized AI-powered study plan in seconds.
        </p>
      </header>

      <main style={{ flex: 1, padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Subject or Exam"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Days to Prepare"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Hours per Day"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: '#0ea5e9',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
          }}
        >
          {loading ? 'Generating...' : 'Generate Study Plan'}
        </button>

        <div
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
          {plan}
        </div>
      </main>

      <footer
        style={{
          background: '#0ea5e9',
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

const inputStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '1rem',
  width: '100%',
};

export default StudyPlanner;
