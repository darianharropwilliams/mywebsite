import React, { useEffect, useState } from 'react';
import SkillGrid from '../../components/skillgrid/SkillGrid';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/skills`)
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('[Skills] Error fetching skills:', err);
        setLoading(false);
      });
  }, []);


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Things I’ve Learned...</h1>
      <p>A structured view of the technologies and concepts I’ve explored.</p>
      {loading ? <p>Loading...</p> : <SkillGrid skills={skills} />}
    </div>
  );
}

export default Skills;
