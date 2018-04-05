const React = require('react');

class ErrorMessage extends React.Component {

  render() {
    return <p className="error-message"><strong>ERROR:</strong> {this.props.message}</p>
  }

}

module.exports = ErrorMessage;
