import React, { Component } from 'react';

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

  render() {
    const { name, email, isDisabled } = this.state;
    return (
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
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
