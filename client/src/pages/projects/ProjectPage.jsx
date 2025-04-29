// ProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPreloadedProject } from '../../utils/projectCache'; // 👈 import the cache reader
import StarSlider from "../../components/star/StarSlider";
import TechCard from "../../components/techcard/TechCard"; // at the top!

function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(() => getPreloadedProject(slug)); // Check cache immediately
  const [loading, setLoading] = useState(!project); // Only load if not cached
  const [error, setError] = useState(null);

  useEffect(() => {
    if (project) return; // Already cached

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

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  }

  if (!project) {
    return <h2 style={{ padding: '2rem' }}>Project not found</h2>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>{project.title}</h1>
      {project.date && <p style={{ fontStyle: 'italic', color: '#666' }}>{project.date}</p>}

      {/* {project.image && (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', maxWidth: '700px', borderRadius: '10px', margin: '1.5rem 0' }}
        />
      )} */}

      {project.description && typeof project.description === 'object' ? (
        <StarSlider description={project.description} />
      ) : (
        <p style={{ fontSize: '1.1rem' }}>{project.longDescription || project.summary}</p>
      )}

      {project.tech && project.tech.length > 0 && (
        <>
          <h3>Technologies Used</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {project.tech.map((t, index) => (
              <TechCard
                key={index}
                name={typeof t === 'string' ? t : t.name}
                logo={typeof t === 'object' ? t.logo : undefined}
                url={typeof t === 'object' ? t.url : `https://www.google.com/search?q=${encodeURIComponent(t)}`}
              />
            ))}
          </div>
        </>
      )}

      {project.skills?.length > 0 && (
        <>
          <h3>Key Skills Developed</h3>
          <ul>
            {project.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </>
      )}

      {project.challenges?.length > 0 && (
        <>
          <h3>Key Challenges</h3>
          <ul>
            {project.challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </>
      )}

      {project.contributions?.length > 0 && (
        <>
          <h3>My Contributions</h3>
          <ul>
            {project.contributions.map((contribution, index) => (
              <li key={index}>{contribution}</li>
            ))}
          </ul>
        </>
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
          <p style={{ fontStyle: 'italic', color: '#444' }}>{project.resume_bullet}</p>
        </>
      )}

      {project.story_mode && (
        <>
          <h3>Story Mode</h3>
          <p>{project.story_mode}</p>
        </>
      )}

      {project.links?.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Links</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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
