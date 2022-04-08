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
    const { assertions } = this.props;
    return (
      <>
        <HeaderFeedback />
        <h1 data-testid="feedback-text">Resultado</h1>
        <p data-testid="feedback-text">{ this.message(assertions) }</p>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
