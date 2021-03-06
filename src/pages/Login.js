import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { fetchTrivia, fetchToken } from '../services/FetchAPI';
import { saveToken, savePlayer, setQuestions } from '../actions';
import './css/style.css';

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
    const { email, name } = this.state;
    const gravatarImage = md5(email).toString();
    const { history, sendToken, sendPlayer, sendQuiz } = this.props;
    const data = await fetchToken();
    const getQuiz = await fetchTrivia(data.token);
    sendToken(data.token);
    sendPlayer(gravatarImage, name);
    sendQuiz(getQuiz);
    history.push('/trivia');
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className='container'>
        <form className='form-label'>
          <input
            id='input-name'
            value={ name }
            placeholder="Name"
            name="name"
            type="text"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            id='input-email'
            value={ email }
            placeholder="Email"
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
        <Link 
          to="/settings"
          id='setting-button' 
          data-testid="btn-settings"
        >
          Settings
        </Link>
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
  sendPlayer: (email, name) => dispatch(savePlayer(email, name)),
  sendQuiz: (payload) => dispatch(setQuestions(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
