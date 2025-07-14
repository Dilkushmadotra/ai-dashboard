import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#222', color: '#fff' }}>
      <h2>📘 AI Study Dashboard</h2>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/study-assistant">AI Assistant</Link></li>
        <li><Link to="/video-search">Videos</Link></li>
        <li><Link to="/smart-search">Search</Link></li>
        <li><Link to="/career-guide">Careers</Link></li>
        <li><Link to="/study-planner">Planner</Link></li>
        <li><Link to="/quiz-zone">Quiz</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
