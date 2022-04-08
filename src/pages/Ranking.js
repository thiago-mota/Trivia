import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { assertions, score, name } = this.props;
    return (
      <main data-testid="ranking-title">
        <h3>Ranking</h3>
        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Score</td>
              <td>Assertions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ name }</td>
              <td data-testid="feedback-total-score">{ score }</td>
              <td data-testid="feedback-total-question">{ assertions }</td>
            </tr>
          </tbody>
        </table>
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
