# drone-deploy

## Running

Set the following environment variables:

* `GITHUB_ORG`
* `GITHUB_REPOS` - comma separated list of repo names
* `DRONE_SERVER`
* `DRONE_TOKEN`
* `DEPLOY_ENVIRONMENTS` - comma separated list of environment names - defaults to `dev,preprod,prod`

Start the server:

```
npm start
```

Visit [](http://localhost:3000).
