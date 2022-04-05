import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailPlayer, namePlayer } = this.props;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(emailPlayer).toString()}` }
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <h1 data-testid="header-player-name">{ namePlayer }</h1>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

Header.propTypes = {
  emailPlayer: PropTypes.string,
  namePlayer: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  emailPlayer: state.player.gravatarEmail,
  namePlayer: state.player.name,
});

export default connect(mapStateToProps)(Header);
