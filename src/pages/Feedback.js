import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  message = (assertions) => {
    if (assertions <= 2) {
      return 'Could be better...';
    }

    if (assertions > 2) {
      return 'Well Done!';
    }
  }

  sendResults = () => {
    const { assertions, score, name, emailGravatar, history } = this.props;
    const infoResults = { name, emailGravatar, assertions, score };
    this.setState((prev) => ({
      ranking: [...prev.ranking, infoResults],
    }), () => this.sendLocalStorage());
    history.push('/ranking');
  }

  sendLocalStorage = () => {
    const { ranking } = this.state;
    localStorage.setItem('infoPlayer', JSON.stringify(ranking));
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <HeaderFeedback />
        <h1>Resultado</h1>
        <p data-testid="feedback-text">{ this.message(assertions) }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.sendResults }
        >
          Ranking
        </button>
        <Link data-testid="btn-play-again" to="/">Play Again</Link>
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
  emailGravatar: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
