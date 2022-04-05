import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia, fetchToken } from '../services/FetchAPI';
import { saveToken } from '../actions';
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => this.setState({
    [target.name]: target.value }, () => this.isDisabled());

  isDisabled = () => {
    const { name, email } = this.state;
    return (
      name.length > 0 && email.length > 0
        ? this.setState({ isDisabled: false })
        : this.setState({ isDisabled: true })
    );
  }

  handleClick = async () => {
    const { history, sendToken } = this.props;
    // await dispatch(getToken());
    const data = await fetchToken();
    await fetchTrivia(data.token);
    sendToken(data.token);
    history.push('/trivia');
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <form>
          <input
            value={ name }
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            id="btn-play"
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <Link to="/settings" data-testid="btn-settings" >Configuração</Link>
      </div>
    );
  }
}

Login.propTypes = {
  hystory: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  sendToken: (payload) => dispatch(saveToken(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
