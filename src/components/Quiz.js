import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MAX_LENGTH = 4;
const SHOW_NEXT = 3;
let STOP_TIMER = null;
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      isDisabled: false,
      timer: 30,
      btnNext: false,
    };
  }

  componentDidMount() {
    this.setTimeOut();
  }

  handleQuestionsClick = ({ target }) => {
    const param = target.parentNode.children;
    console.log(param);
    for (let i = 0; i < param.length; i += 1) {
      if (param[i].className === 'correctAnswer') {
        param[i].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        param[i].style.border = '3px solid rgb(255, 0, 0)';
      }
    }
    this.setState({ btnNext: true });
  }

  shuffleArray = (questions) => {
    const { isDisabled } = this.state;
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
          disabled={ isDisabled }
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

  nextQuestion = () => {
    const { i } = this.state;
    if (i < MAX_LENGTH) {
      this.setState({ i: i + 1, timer: 30 });
    }

    if (i === SHOW_NEXT) {
      this.setState({ btnNext: false });
    }
  }

  setTimeOut = () => {
    const timeout = 1000;
    STOP_TIMER = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer <= 0) {
          this.setState({ isDisabled: true });
          clearInterval(STOP_TIMER);
        }
      });
    }, timeout);
  }

  render() {
    const { questions } = this.props;
    const { i, timer, btnNext } = this.state;
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
        {
          btnNext && i < MAX_LENGTH
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                Next
              </button>)
        }
        {
          !btnNext && i === MAX_LENGTH
            && <button type="button">Resultado</button>
        }
        {/* {
          i < MAX_LENGTH ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )
            : <button type="button">Resultado</button>
        } */}
        <p>{ timer }</p>
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
