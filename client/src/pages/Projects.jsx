import content from '../data/projects.json';

function Projects() {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}

export default Projects;
