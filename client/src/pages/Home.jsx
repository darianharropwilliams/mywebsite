import ContactForm from '../components/contactform/ContactForm.jsx';  // Import the ContactForm component

function Home() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the home page where you'll find my bio.</p>

      <ContactForm />  {/* Include the ContactForm component here */}
    </div>
  );
}

export default Home;
