import React from 'react';
import Header from '../components/Header';
import Quiz from '../components/Quiz';

class TriviaGame extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <p>Quiz</p>
        <Quiz />
      </main>
    );
  }
}

export default TriviaGame;
