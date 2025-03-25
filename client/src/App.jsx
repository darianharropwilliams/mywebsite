import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Skills from './pages/Skills.jsx';
import Projects from './pages/Projects.jsx';
import Blog from './pages/Blog.jsx';
import FunGadgets from './pages/Gadgets.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';  // Sidebar component for navigation

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/fun-gadgets" element={<FunGadgets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
