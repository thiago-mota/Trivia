import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5'

class Header extends Component {
  render() {
    const { emailPlayer, namePlayer } = this.props;
    console.log('email', emailPlayer, 'name', namePlayer);
    return (
        <div>
          <img
            src={`https://www.gravatar.com/avatar/${md5(emailPlayer).toString()}`}
            data-testid="header-profile-picture"
            alt="gravatar"
          />
          <h1 data-testid="header-player-name">{ namePlayer }</h1>
          <span data-testid="header-score" >0</span>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  emailPlayer: state.player.gravatarEmail,
  namePlayer: state.player.name,
})

export default connect(mapStateToProps)(Header);
