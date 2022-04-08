import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class HeaderFeedback extends Component {
  render() {
    const { emailPlayer, namePlayer, score, assertions } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(emailPlayer).toString()}` }
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <h1 data-testid="header-player-name">{ namePlayer }</h1>
        <p data-testid="header-score">{ score }</p>
        <span>{ `Assertions: ${assertions}` }</span>
      </div>
    );
  }
}

HeaderFeedback.propTypes = {
  emailPlayer: PropTypes.string,
  namePlayer: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  emailPlayer: state.player.gravatarEmail,
  namePlayer: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(HeaderFeedback);
