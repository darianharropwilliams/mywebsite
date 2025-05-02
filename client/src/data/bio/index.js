import bio from './bio.json';

const context = require.context('./events', true, /\.json$/);
const rawEvents = context.keys().map(context);

// Sort by date descending
const events = rawEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

export default {
  ...bio,
  events
};
