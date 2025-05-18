// client/src/utils/skillsCache.js
let cachedSkills = null;

export const getCachedSkills = () => cachedSkills;

export const fetchSkills = async () => {
  if (cachedSkills) return cachedSkills;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/skills`);
    const data = await res.json();
    cachedSkills = data;
    return data;
  } catch (err) {
    console.error('Failed to fetch and cache skills:', err);
    return null;
  }
};
