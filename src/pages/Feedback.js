import React from 'react';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="feedback-text">Resultado</h1>
        <HeaderFeedback />
      </>
    );
  }
}

export default Feedback;
