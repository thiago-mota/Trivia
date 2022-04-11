import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveScore } from '../actions';
import './css/style.css';

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
      assertions: 0,
    };
  }

  componentDidMount() {
    this.setTimeOut();
  }

  handleQuestionsClick = ({ target }) => {
    const { sendScore, questions } = this.props;
    const { i } = this.state;
    if (i < MAX_LENGTH) { this.setState({ btnNext: true }); }
    const param = target.parentNode.children;
    for (let index = 0; index < param.length; index += 1) {
      if (param[index].className === 'correctAnswer') {
        param[index].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        param[index].style.border = '3px solid rgb(255, 0, 0)';
      }
    }

    const { timer } = this.state;
    const TEN = 10;
    const tres = 3;
    const DIFFICULTY = (questions[i].difficulty === 'hard' && timer * tres)
    || (questions[i].difficulty === 'medium' && timer * 2)
    || (questions[i].difficulty === 'easy' && timer * 1);
    if (target.className === 'correctAnswer') {
      this.setState((prev) => ({
        points: parseFloat(prev.points) + (parseFloat(TEN) + parseFloat(DIFFICULTY)),
        assertions: prev.assertions + 1,
      }), () => sendScore(this.state));
    }
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
    const { history } = this.props;
    if (i < MAX_LENGTH) {
      this.setState({ i: i + 1, timer: 30 });
    }

    if (i === SHOW_NEXT) {
      this.setState({ btnNext: false });
    }

    if (i === MAX_LENGTH) {
      history.push('/feedback');
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
      <div className='container'>
        {questions && (
          <>
            <p data-testid="question-category">
              {questions[i].category}
            </p>
            <p 
              className='question'
              data-testid="question-text"
            >
              {questions[i].question}
            </p>
            <div 
              className='answer'
              data-testid="answer-options"
            >
              {this.shuffleArray(questions[i])}
            </div>
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
            && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.nextQuestion }
              >
                Resultado
              </button>)
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
