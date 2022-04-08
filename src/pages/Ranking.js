import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = { ranking: [] };
  }

  componentDidMount() {
    const resultsLocalStorage = JSON.parse(localStorage.getItem('infoPlayer'));
    this.setState({ ranking: resultsLocalStorage });
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
              <td>Email</td>
              <td>Score</td>
              <td>Assertions</td>
            </tr>
          </thead>
          <tbody>
            { ranking.length > 0
            && ranking.map((item) => (
              <tr key={ item.name }>
                <td>{ item.name }</td>
                <td data-testid="feedback-total-score">{ item.emailGravatar }</td>
                <td data-testid="feedback-total-score">{ item.score }</td>
                <td data-testid="feedback-total-question">{ item.assertions }</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link data-testid="btn-go-home" to="/">Play Again</Link>
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
