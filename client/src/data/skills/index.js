import languages from './languages.json';
import libraries from './libraries.json';
import tools from './tools.json';
import frameworks from './frameworks.json';
import cyber from './cyber.json';

const allSkills = [
  ...languages.map(skill => ({ ...skill, type: 'Language' })),
  ...libraries.map(skill => ({ ...skill, type: 'Library' })),
  ...tools.map(skill => ({ ...skill, type: 'Tool' })),
  ...frameworks.map(skill => ({ ...skill, type: 'Framework' })),
  ...cyber.map(skill => ({ ...skill, type: 'Cyber Tool' }))
];

const content = {
  title: "Things I've Learned...",
  description: "A structured view of the technologies and concepts I've explored.",
  skills: allSkills
};

export default content;
