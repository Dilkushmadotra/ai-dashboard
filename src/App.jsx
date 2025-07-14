import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import StudyAssistant from './pages/studyassistant';
import VideoSearch from './pages/videosearch';
import SmartSearch from './pages/smartsearch';
import CareerGuide from './pages/carrierguied';
import StudyPlanner from './pages/studyplanner';
import QuizZone from './pages/quizzone';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-assistant" element={<StudyAssistant />} />
        <Route path="/video-search" element={<VideoSearch />} />
        <Route path="/smart-search" element={<SmartSearch />} />
        <Route path="/career-guide" element={<CareerGuide />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
        <Route path="/quiz-zone" element={<QuizZone />} />
      </Routes>
      <Footer />
    </div>
  );
};


export default App;
