import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class HeaderFeedback extends Component {
  render() {
    const { emailPlayer, namePlayer, score } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(emailPlayer).toString()}` }
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <h1 data-testid="header-player-name">{ namePlayer }</h1>
        <span data-testid="header-score">{ score }</span>
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
});

export default connect(mapStateToProps)(HeaderFeedback);
