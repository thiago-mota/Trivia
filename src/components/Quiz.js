import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveScore } from '../actions';

const MAX_LENGTH = 4;
const SHOW_NEXT = 3;
let STOP_TIMER = null;
class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      i: 0,
      isDisabled: false,
      timer: 30,
      btnNext: false,
      points: 0,
    };
  }

  componentDidMount() {
    this.setTimeOut();
  }

  handleQuestionsClick = ({ target }) => {
    const { sendScore, questions } = this.props;
    const param = target.parentNode.children;
    // const scoreCurr = 0;
    for (let i = 0; i < param.length; i += 1) {
      if (param[i].className === 'correctAnswer') {
        param[i].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        param[i].style.border = '3px solid rgb(255, 0, 0)';
      }
    }
    this.setState({ btnNext: true });

    const { timer, i } = this.state;
    const TEN = 10;
    const tres = 3;
    const DIFFICULTY = (questions[i].difficulty === 'hard' && timer * tres)
    || (questions[i].difficulty === 'medium' && timer * 2)
    || (questions[i].difficulty === 'easy' && timer * 1);
    if (target.className === 'correctAnswer') {
      this.setState((prev) => ({
        points: parseFloat(prev.points) + (parseFloat(TEN) + parseFloat(DIFFICULTY)),
      }), () => sendScore(this.state));
    }
    // if (i === MAX_LENGTH) {
    //   const { history } = this.props;
    //   console.log(this.props);
    //   history.push('/feedback');
    // }
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
    console.log(this.props);
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

const mapDispatchToProps = (dispatch) => ({
  sendScore: (payload) => dispatch(saveScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
