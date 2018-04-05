const Drone = require('drone-node');

module.exports = settings => {

  const client = new Drone.Client({ url: settings.server, token: settings.token });

  return {
    getDeploys: (repo, env) => {
      return client.getBuilds(settings.org, repo)
        .then(builds => {
          return builds
            .filter(b => b.event === 'deployment')
            .filter(b => b.status === 'success')
            .filter(b => b.deploy_to === env)
        });
    },
    deploy: (repo, number, env) => {}
  };

};
