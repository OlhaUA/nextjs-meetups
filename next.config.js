const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'olhaAnhel',
        mongodb_password: 'Hzu58k287QPpU3Fj',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'meetups',
      },
    };
  }

  return {
    env: {
      mongodb_username: 'olhaAnhel',
      mongodb_password: 'Hzu58k287QPpU3Fj',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'meetups-prod',
    },
  };
};
