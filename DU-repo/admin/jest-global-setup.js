module.exports = async () => {
  // Set a global timezone to ensure data/time Jest tests work locally and during continuous integration
  process.env.TZ = 'America/Denver';
};
