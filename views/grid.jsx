const React = require('react');
const moment = require('moment');

class Grid extends React.Component {

  promote(repo, env, number) {
    this.props.onPromote(repo, env, number);
  }

  revert(repo, env, number) {
    this.props.onRevert(repo, env, number);
  }

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
            <th>{ repo.name }</th>
            {
              this.props.environments.map(env => {
                return <td key={ repo.name + env }>
                  <ol>
                    {
                      repo[env].map(b => <li key={ b.commit } className={`${b.status} ${b.current ? 'current' : 'old'}`}>
                        <span>
                          {
                            b.current ? <strong>Current ({ b.number }): </strong> : <strong>{ b.number }: </strong>
                          }
                          <a href={`https://github.com/${this.props.org}/${repo.name}/tree/${b.commit}`}>{ b.message.substr(0, 30) }</a>
                          {
                            b.finished_at ? <span> ({ moment(b.finished_at * 1000).toNow(true) } ago)</span> : <span> (Running)</span>
                          }
                        </span>
                        {
                          b.promotable && <button className="button-small" onClick={() => this.promote(repo.name, env, b.number)}>Promote</button>
                        }
                        {
                          !b.current && b.status === 'success' && <button className="button-small button-outline" onClick={() => this.revert(repo.name, env, b.number)}>Revert</button>
                        }
                      </li>)
                    }
                  </ol>
                </td>
              })
            }
          </tr>
        })
      }
    </table>
  }

}

module.exports = Grid;
