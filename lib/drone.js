const Drone = require('drone-node');
const { uniqBy } = require('lodash');

module.exports = settings => {

  const client = new Drone.Client({ url: settings.server, token: settings.token });

  const loadAll = () => {
    return Promise.all(settings.repos.map(async name => {
      const response = { name };
      for (const i in settings.environments) {
        const env = settings.environments[i];
        response[env] = await getDeploys(name, env);
      }
      return response;
    }));
  };

  const getDeploys = (repo, env) => {
    return client.getBuilds(settings.org, repo)
      .then(builds => {
        return builds
          .filter(b => b.event === 'deployment')
          .filter(b => b.deploy_to === env)
          .map((b, i) => {
            const current = b.status === 'success' && i === 0;
            return Object.assign(b, { current, promotable: current && env !== settings.environments[settings.environments.length - 1] })
          })
      })
      .then(builds => uniqBy(builds, 'commit'))
      .then(builds => builds.slice(0, 6));
  };

  const deploy = (repo, number, env) => {
    const url = `/api/repos/${settings.org}/${repo}/builds/${number}?event=deployment&deploy_to=${env}`;
    return client._request('post', url);
  };

  return {
    loadAll,
    getDeploys,
    deploy
  };

};
