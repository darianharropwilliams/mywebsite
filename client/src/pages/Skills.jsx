import content from '../data/bio.json';

function Skills() {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}

export default Skills;
