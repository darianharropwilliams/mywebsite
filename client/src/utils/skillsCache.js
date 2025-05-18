// client/src/utils/skillsCache.js
let cachedSkills = null;

export const getCachedSkills = () => cachedSkills;

export const fetchSkills = async () => {
  if (cachedSkills) {
    console.log('[skillsCache] Using cached skills');
    return cachedSkills;
  }

  console.log('[skillsCache] Fetching skills from API...');
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/skills`);
    const data = await res.json();
    console.log('[skillsCache] Skills fetched and cached:', data);
    cachedSkills = data;
    return data;
  } catch (err) {
    console.error('[skillsCache] Failed to fetch and cache skills:', err);
    return null;
  }
};

