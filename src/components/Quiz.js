import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
    };
  }

  shuffleArray = (questions) => {
    const NUMBER = 0.5;
    const answers = [...questions.incorrect_answers, questions.correct_answer];
    return (
      answers.sort(() => Math.random() - NUMBER).map((answer, i) => (
        <button
          key={ i }
          type="button"
          data-testid={
            answer === questions.correct_answer ? 'correct-answer' : `wrong-answer-${i}`
          }
        >
          {answer}
        </button>
      ))
    );
  }

  render() {
    const { questions } = this.props;
    console.log(questions);
    const { i } = this.state;
    return (
      <div>
        {questions && (
          <>
            <p data-testid="question-category">
              {questions[i].category}
            </p>
            <p data-testid="question-text">
              {questions[i].question}
            </p>
            <div data-testid="answer-options">{this.shuffleArray(questions[i])}</div>
          </>
        )}
      </div>
    );
  }
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.quiz.results,
});
export default connect(mapStateToProps)(Quiz);
