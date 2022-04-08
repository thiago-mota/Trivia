import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

  sendResults = () => {
    const { name, score, emailGravatar } = this.props;
    const infoResults = { name, score, emailGravatar };
    this.sendLocalStorage(infoResults);
  }

  sendLocalStorage = (info) => {
    const { history } = this.props;
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const getStorage = JSON.parse(localStorage.getItem('ranking'));
    const totalResults = [...getStorage, info];
    localStorage.setItem('ranking', JSON.stringify(totalResults));
    history.push('/ranking');
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
