const React = require('react');
const request = require('r2');

const Grid = require('./grid');
const Loader = require('./loader');

class Container extends React.Component {

  componentDidMount() {
    this.setState({ loading: true });
    setInterval(() => this.fetch(), 5000);
    this.fetch();
  }

  fetch() {
    request.get('/data').json
      .then(json => {
        this.setState(json);
        this.setState({ loading: false });
      });
  }

  promote(repo, env, number) {
    request.post('/promote', { json: { repo, env, number } }).json
      .then(json => this.setState(json));
  }

  revert(repo, env, number) {
    request.post('/revert', { json: { repo, env, number } }).json
      .then(json => this.setState(json));
  }

  render() {
    return (!this.state || this.state.loading) ? <Loader/> : <Grid
      { ...this.state }
      onPromote={ (r, e, n) => this.promote(r, e, n) }
      onRevert={ (r, e, n) => this.revert(r, e, n) }
      />
  }

}

module.exports = Container;

