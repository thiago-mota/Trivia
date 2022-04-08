import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultState } from '../actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = { ranking: '' };
  }

  componentDidMount() {
    const resultsLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: resultsLocalStorage,
    });
  }

  pageLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(defaultState());
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <main data-testid="ranking-title">
        <h3>Ranking</h3>
        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Score</td>
              <td>Picture</td>
            </tr>
          </thead>
          <tbody>
            { !ranking ? <p>Sem Jogadores</p>
              : (ranking.sort((a, b) => b.score - a.score).map((item, index) => (
                <tr key={ item.name[index] }>
                  <td data-testid={ `player-name-${index}` }>{ item.name }</td>
                  <td data-testid={ `player-score-${index}` }>{ item.score }</td>
                  <td>
                    <img src={ `https://www.gravatar.com/avatar/${item.emailGravatar}` } alt={ `Foto de ${item.name}` } />
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.pageLogin }
        >
          Play Again
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Ranking);
