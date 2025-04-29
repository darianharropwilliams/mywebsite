import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home.jsx';
import Skills from './pages/skills/Skills.jsx';
import Projects from './pages/projects/Projects.jsx';
import ProjectPage from './pages/projects/ProjectPage.jsx'
import Blog from './pages/blog/Blog.jsx';
import Demos from './pages/demos/Demos.jsx';
import Topbar from './components/topbar/Topbar.jsx';  // Topbar component for navigation
import Bottombar from './components/bottombar/Bottombar.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/demos" element={<Demos />} />
        </Routes>
        <Bottombar />
      </div>
    </Router>
  );
}

export default App;
