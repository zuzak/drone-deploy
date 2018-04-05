const express = require('express');
const path = require('path');
const views = require('express-react-views');
const parser = require('body-parser');
const Drone = require('./drone');

module.exports = settings => {
  const app = express();
  const drone = Drone(settings);

  app.set('view engine', 'jsx');
  app.set('views', path.resolve(__dirname, '../views'));
  app.engine('jsx', views.createEngine());

  app.use('/public', express.static(path.resolve(__dirname, '../public')));

  app.use(parser.json());

  app.get('/', (req, res) => {
    res.render('index');
  });

  const data = () => (req, res, next) => {
    drone.loadAll()
      .then(repos => res.json({
        environments: settings.environments,
        org: settings.org,
        error: null,
        repos
      }))
      .catch(next);
  }

  app.get('/data', data());

  app.post('/promote', (req, res, next) => {
    const { repo, number, env } = req.body;
    drone.getDeploys(repo, env)
      .then(deploys => {
        return deploys.find(d => d.number === number);
      })
      .then(deploy => {
        if (deploy && deploy.promotable) {
          const i = settings.environments.indexOf(env);
          const next = settings.environments[i + 1];
          return drone.deploy(repo, number, next);
        }
        throw new Error('Only currently deployed builds can be promoted.');
      })
      .then(() => next())
      .catch(next);
  }, data());

  app.post('/revert', (req, res, next) => {
    const { repo, number, env } = req.body;
    drone.deploy(repo, number, env)
      .then(() => next())
      .catch(next);
  }, data());

  app.use((err, req, res, next) => {
    if (req.url === '/') {
      return next(err);
    }
    console.error(err);
    res.status(err.statusCode || 500);
    res.json({ error: err.message });
  });

  return app;
};
