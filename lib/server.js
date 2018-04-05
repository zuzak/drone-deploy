const express = require('express');
const path = require('path');
const views = require('express-react-views');
const Drone = require('./drone');

module.exports = settings => {
  const app = express();
  const drone = Drone(settings);

  app.set('view engine', 'jsx');
  app.set('views', path.resolve(__dirname, '../views'));
  app.engine('jsx', views.createEngine());

  app.get('/', (req, res, next) => {
    Promise.all(settings.repos.map(async name => {
      const response = { name };
      for (const i in settings.environments) {
        const env = settings.environments[i];
        response[env] = await drone.getDeploys(name, env);
      }
      return response;
    }))
    .then(repos => {
      res.render('index', {
        environments: settings.environments,
        org: settings.org,
        repos
      });
    })
    .catch(next);
  });

  return app;
};
