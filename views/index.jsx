const React = require('react');

class Index extends React.Component {

  render() {
    return <html>
      <head>
        <title>Deployments</title>
        <link rel="stylesheet" href="/public/app.css" />
      </head>
      <body>
        <h1>Deployments</h1>
        <div id="container" />
        <script src="/public/app.js" />
      </body>
    </html>
  }

}

module.exports = Index;