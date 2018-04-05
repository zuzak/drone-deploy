module.exports = {
  server: process.env.DRONE_SERVER,
  token: process.env.DRONE_TOKEN,
  environments: (process.env.DEPLOY_ENVIRONMENTS || 'dev,preprod,prod').split(',').map(s => s.trim()),
  org: process.env.GITHUB_ORG,
  repos: (process.env.GITHUB_REPOS || '').split(',').map(s => s.trim()).filter(Boolean)
};
