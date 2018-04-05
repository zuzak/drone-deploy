const React = require('react');

class Loader extends React.Component {

  componentDidMount() {
    this.setState({ i: 0 });
    this.interval = setInterval(() => this.ping(), 500);
  }

  componentDidUnmount() {
    clearInterval(this.interval);
  }

  ping() {
    let i = (this.state.i || 0);
    i = (i + 1)%3
    this.setState({ i });
  }

  render() {
    const i = this.state ? this.state.i : 0;
    return <div className="loader">Loading.{'..'.substr(0, i)}</div>
  }

}

module.exports = Loader;
