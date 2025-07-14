import { useState } from 'react';
import axios from 'axios';

const QuizZone = () => {
  const [topic, setTopic] = useState('');
  const [questionType, setQuestionType] = useState('MCQ');
  const [questionCount, setQuestionCount] = useState(5);
  const [marksPerQuestion, setMarksPerQuestion] = useState(1);
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) return alert('Please enter a topic.');

    setLoading(true);
    setQuestions('Generating quiz...');

    const prompt = `Create ${questionCount} ${questionType} questions on the topic "${topic}".
Each question should be worth ${marksPerQuestion} marks.
${questionType === 'MCQ'
  ? 'Format as:\nQ1. Question?\na) Option 1\nb) Option 2\nc) Option 3\nd) Option 4\nAnswer: b) Option'
  : 'Keep the language clear and academic.'}
`;

    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
          params: { key: import.meta.env.VITE_GEMINI_API_KEY },
        }
      );

      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setQuestions(text || '⚠️ No quiz received.');
    } catch (error) {
      console.error(error);
      setQuestions('❌ Error fetching quiz from Gemini API.');
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
        <h1 style={{ fontSize: '2.5rem', color: '#b91c1c', marginBottom: '10px' }}>
          🎓 Quiz Zone
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#334155' }}>
          Generate topic-wise questions with marks and type.
        </p>
      </header>

      <main style={{ flex: 1, padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter topic (e.g., Photosynthesis)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={inputStyle}
          />

          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            style={inputStyle}
          >
            <option value="MCQ">MCQ</option>
            <option value="Short">Short Answer</option>
            <option value="Long">Long Answer</option>
          </select>

          <input
            type="number"
            placeholder="No. of Questions"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
            style={inputStyle}
            min={1}
          />

          <input
            type="number"
            placeholder="Marks per Question"
            value={marksPerQuestion}
            onChange={(e) => setMarksPerQuestion(e.target.value)}
            style={inputStyle}
            min={1}
          />
        </div>

        <button
          onClick={handleGenerateQuiz}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>

        <div style={outputBox}>
          {questions}
        </div>
      </main>

      
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  fontSize: '1rem',
  width: '100%',
};

const buttonStyle = {
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: '#dc2626',
  color: '#fff',
  border: 'none',
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: '20px',
};

const outputBox = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  minHeight: '150px',
  whiteSpace: 'pre-wrap',
  fontSize: '1rem',
  color: '#1e293b',
};

export default QuizZone;
