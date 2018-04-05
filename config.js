module.exports = {
  server: process.env.DRONE_SERVER,
  token: process.env.DRONE_TOKEN,
  environments: ['dev', 'preprod'],
  org: process.env.GITHUB_ORG,
  repos: (process.env.GITHUB_REPOS || '').split(',')
};
