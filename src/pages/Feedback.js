import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  message = (assertions) => {
    if (assertions <= 2) {
      return 'Could be better...';
    }

    if (assertions > 2) {
      return 'Well Done!';
    }
  }

  render() {
    const { assertions, score, name } = this.props;
    return (
      <>
        <HeaderFeedback />
        <h1>Resultado</h1>
        <p data-testid="feedback-text">{ this.message(assertions) }</p>
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
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
});

export default connect(mapStateToProps)(Feedback);
