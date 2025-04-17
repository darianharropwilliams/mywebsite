import content from '../data/home.json';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </div>
      <div className="home-image">
        <img src="/Cover_image.jpeg" alt="Cover of Darian" />
      </div>
    </div>
  );
}

export default Home;
