// TOOLS
import devops from './tools/devops.json';
import development from './tools/development.json';
import debugging from './tools/debugging.json';
import build from './tools/build.json';
import database from './tools/database.json';
import cybersecurity from './tools/cybersecurity.json';

const tools = [
  ...devops.map(item => ({ ...item, type: 'Tools', subfield: 'DevOps' })),
  ...development.map(item => ({ ...item, type: 'Tools', subfield: 'Development Tools' })),
  ...debugging.map(item => ({ ...item, type: 'Tools', subfield: 'Debugging' })),
  ...build.map(item => ({ ...item, type: 'Tools', subfield: 'Build Tools' })),
  ...database.map(item => ({ ...item, type: 'Tools', subfield: 'Database Tools' })),
  ...cybersecurity.map(item => ({ ...item, type: 'Tools', subfield: 'Cybersecurity' })),
];

// LANGUAGES
import web from './languages/web.json';
import backend from './languages/backend.json';
import scripting from './languages/scripting.json';
import systems from './languages/systems.json';
import assembly from './languages/assembly.json';
import functional from './languages/functional.json';
import logic from './languages/logic.json';
import documentation from './languages/documentation.json';

const languages = [
  ...web.map(item => ({ ...item, type: 'Languages', subfield: 'Web' })),
  ...backend.map(item => ({ ...item, type: 'Languages', subfield: 'Backend' })),
  ...scripting.map(item => ({ ...item, type: 'Languages', subfield: 'Scripting' })),
  ...systems.map(item => ({ ...item, type: 'Languages', subfield: 'Systems' })),
  ...assembly.map(item => ({ ...item, type: 'Languages', subfield: 'Assembly' })),
  ...functional.map(item => ({ ...item, type: 'Languages', subfield: 'Functional' })),
  ...logic.map(item => ({ ...item, type: 'Languages', subfield: 'Logic' })),
  ...documentation.map(item => ({ ...item, type: 'Languages', subfield: 'Documentation' }))
];

// LIBRARIES
import backendLibs from './libraries/backend.json';
import frontendLibs from './libraries/frontend.json';
import mlLibs from './libraries/ml.json';
import networkingLibs from './libraries/networking.json';

const libraries = [
  ...backendLibs.map(item => ({ ...item, type: 'Libraries', subfield: 'Backend' })),
  ...frontendLibs.map(item => ({ ...item, type: 'Libraries', subfield: 'Frontend' })),
  ...mlLibs.map(item => ({ ...item, type: 'Libraries', subfield: 'Machine Learning' })),
  ...networkingLibs.map(item => ({ ...item, type: 'Libraries', subfield: 'Networking' }))
];

const allSkills = [...tools, ...languages, ...libraries];

const content = {
  title: 'Things I’ve Learned...',
  description: 'A structured view of the technologies and concepts I’ve explored.',
  skills: allSkills
};

export default content;
