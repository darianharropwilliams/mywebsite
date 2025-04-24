import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Skills from './pages/Skills.jsx';
import Projects from './pages/Projects.jsx';
import Blog from './pages/Blog.jsx';
import Demos from './pages/Demos.jsx';
import Topbar from './components/topbar/Topbar.jsx';  // Topbar component for navigation
import Bottombar from './components/bottombar/Bottombar.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bio" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/demos" element={<Demos />} />
        </Routes>
        <Bottombar />
      </div>
    </Router>
  );
}

export default App;
