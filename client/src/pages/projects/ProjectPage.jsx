// ProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPreloadedProject, preloadProject } from '../../utils/projectCache';
import StarSlider from "../../components/star/StarSlider";
import TechCard from "../../components/techcard/TechCard";
import {Link} from 'react-router-dom'
import './ProjectPage.css';

const PATHS = {
  story: "Story Mode",
  skills: "What I Learned",
  build: "What I Built"
};

function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(() => getPreloadedProject(slug));
  const [loading, setLoading] = useState(!project);
  const [error, setError] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadProject() {
      try {
        setLoading(true);
        const fullProject = await preloadProject(slug);
        if (isMounted) setProject(fullProject);
      } catch (err) {
        if (isMounted) setError(err.message || 'Unknown error');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (!project || !project.description || !project.tech || !project.links) {
      loadProject();
    } else {
      setLoading(false);
    }

    return () => { isMounted = false; };
  }, [slug]);

  if (loading) return <div className="project-loading">Loading...</div>;
  if (error) return <div className="project-error">Error: {error}</div>;
  if (!project) return <h2 className="project-not-found">Project not found</h2>;

  return (
    <div className="project-page">
      <Link to="/projects" className="back-to-projects">
        ← All Projects
      </Link>
      
      {/* Intro Section */}
      <h1>{project.title}</h1>
      {project.date && <p className="project-date">{project.date}</p>}
      {project.purpose && <div className="project-purpose-tag">{project.purpose}</div>}
      <p className="project-description">{project.summary || project.longDescription}</p>

      {/* Choice Hub */}
      {!selectedPath && (
        <div className="choice-hub">
          <p className="choice-prompt">What would you like to explore?</p>
          <div className="choice-buttons">
            {Object.entries(PATHS).map(([key, label]) => (
              <button key={key} onClick={() => setSelectedPath(key)} className="choice-button">
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content Panel */}
      {selectedPath === "story" && (
        <>
        {selectedPath && (
          <div className="back-button-container">
            <button className="back-button" onClick={() => setSelectedPath(null)}>
              ← Back to Overview
            </button>
          </div>
        )}
          {typeof project.description === 'object' && <StarSlider description={project.description} />}
          {project.story_mode && <p>{project.story_mode}</p>}
          {project.resume_bullet && (
            <>
              <h3>Resume Bullet</h3>
              <p>{project.resume_bullet}</p>
            </>
          )}
        </>
      )}

      {selectedPath === "skills" && (
        <>
        {selectedPath && (
          <div className="back-button-container">
            <button className="back-button" onClick={() => setSelectedPath(null)}>
              ← Back to Overview
            </button>
          </div>
        )}
          {project.skills?.length > 0 && (
            <div className="list-section">
              <h3>Key Skills Developed</h3>
              <div className="list-items">
                {project.skills.map((skill, index) => (
                  <div key={index} className="list-item">{skill}</div>
                ))}
              </div>
            </div>
          )}
          {project.challenges?.length > 0 && (
            <div className="list-section">
              <h3>Key Challenges</h3>
              <div className="list-items">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="list-item">{challenge}</div>
                ))}
              </div>
            </div>
          )}
          {project.achievements && (
            <>
              <h3>Achievements</h3>
              <p>{project.achievements}</p>
            </>
          )}
        </>
      )}

      {selectedPath === "build" && (
        <>
        {selectedPath && (
          <div className="back-button-container">
            <button className="back-button" onClick={() => setSelectedPath(null)}>
              ← Back to Overview
            </button>
          </div>
        )}
          {project.tech?.length > 0 && (
            <>
              <h3>Technologies Used</h3>
              <div className="tech-container">
                {project.tech.map((t, index) => (
                  <TechCard
                    key={index}
                    name={typeof t === 'string' ? t : t.name}
                    logo={typeof t === 'object' ? t.logo : undefined}
                  />
                ))}
              </div>
            </>
          )}
          {project.contributions?.length > 0 && (
            <div className="list-section">
              <h3>My Contributions</h3>
              <div className="list-items">
                {project.contributions.map((item, index) => (
                  <div key={index} className="list-item">{item}</div>
                ))}
              </div>
            </div>
          )}
          {project.links?.length > 0 && (
            <div className="project-links">
              <h3>Links</h3>
              <div className="link-list">
                {project.links.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noreferrer" className="project-link-button">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectPage;
