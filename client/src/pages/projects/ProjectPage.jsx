// ProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPreloadedProject } from '../../utils/projectCache';
import StarSlider from "../../components/star/StarSlider";
import TechCard from "../../components/techcard/TechCard";
import './ProjectPage.css';

function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(() => getPreloadedProject(slug));
  const [loading, setLoading] = useState(!project);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (project) return;

    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug, project]);

  if (loading) return <div className="project-loading">Loading...</div>;
  if (error) return <div className="project-error">Error: {error}</div>;
  if (!project) return <h2 className="project-not-found">Project not found</h2>;

  return (
    <div className="project-page">
      <h1>{project.title}</h1>
      {project.date && <p className="project-date">{project.date}</p>}

      {project.description && typeof project.description === 'object' ? (
        <StarSlider description={project.description} />
      ) : (
        <p className="project-description">{project.longDescription || project.summary}</p>
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

      {project.contributions?.length > 0 && (
        <div className="list-section">
          <h3>My Contributions</h3>
          <div className="list-items">
            {project.contributions.map((contribution, index) => (
              <div key={index} className="list-item">{contribution}</div>
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

      {project.resume_bullet && (
        <>
          <h3>Resume Bullet</h3>
          <p className="project-resume">{project.resume_bullet}</p>
        </>
      )}

      {project.story_mode && (
        <>
          <h3>Story Mode</h3>
          <p>{project.story_mode}</p>
        </>
      )}

      {project.links?.length > 0 && (
        <div className="project-links">
          <h3>Links</h3>
          <div className="link-list">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="project-link-button"
              >
                {link.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="external-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                  <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
