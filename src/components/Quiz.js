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

  handleQuestionsClick = ({ target }) => {
    const param = target.parentNode.children;
    console.log(param[0]);
    for (let i = 0; i < param.length; i += 1) {
      if (param[i].className === 'correctAnswer') {
        param[i].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        param[i].style.border = '3px solid rgb(255, 0, 0)';
      }
    }
  }

  shuffleArray = (questions) => {
    const NUMBER = 0.5;
    const answers = [...questions.incorrect_answers, questions.correct_answer];
    return (
      answers.sort(() => Math.random() - NUMBER).map((answer, i) => (
        <button
          className={
            answer === questions.correct_answer ? 'correctAnswer' : 'incorrectAnswer'
          }
          key={ i }
          type="button"
          data-testid={
            answer === questions.correct_answer ? 'correct-answer' : `wrong-answer-${i}`
          }
          onClick={ this.handleQuestionsClick }
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
