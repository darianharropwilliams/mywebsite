import content from '../data/demos.json';

function Gadgets() {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}

export default Gadgets;
