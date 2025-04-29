import content from '../../data/demos.json';

function Demos() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>

      {/* Construction Zone Visual */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        border: '4px dashed #f0c000',
        backgroundColor: '#fff8dc',
        borderRadius: '12px',
        display: 'inline-block'
      }}>
        <span style={{ fontSize: '2rem' }}>🚧👷‍♂️ Under Construction 👷‍♀️🚧</span>
        <p style={{ marginTop: '1rem' }}>Please check back later for interactive demos!</p>
        <div style={{ fontSize: '3rem' }}>
          🟧🟧🟧🟧🟧<br />
          🚧🚧🚧🚧🚧
        </div>
      </div>
    </div>
  );
}

export default Demos;
