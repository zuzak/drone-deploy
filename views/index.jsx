const React = require('react');
const moment = require('moment');

class DeployGrid extends React.Component {

  render() {
    return <table>
      <thead>
        <tr>
          <th/>
          {
            this.props.environments.map(env => <th key={ env }>{ env }</th>)
          }
        </tr>
      </thead>
      {
        this.props.repos.map(repo => {
          return <tr key={ repo.name }>
            <td>{ repo.name }</td>
            {
              this.props.environments.map(env => <td key={ repo.name + env }>
                <ul>
                  {
                    repo[env].map(b => <li key={ b.commit }>
                      <a href={`https://github.com/${this.props.org}/${repo.name}/tree/${b.commit}`}>{ b.commit.substr(0, 6) }</a> ({ moment(b.finished_at * 1000).toNow(true) } ago)
                    </li>)
                  }
                </ul>
              </td>)
            }
          </tr>
        })
      }
    </table>
  }

}

module.exports = DeployGrid;