import React, { Component } from 'react';
import { connect } from 'react-redux';

class Quiz extends Component {
  shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  render() {
    const { questions } = this.props;
    // const answers = [...questions]
    return (
      <div>
        {
          questions.map((question, i) => {
            const answers = [...question.incorrect_answers, question.correct_answer]
            const deckAnswers = shuffleArray(answers);
            <h3>{question.question}</h3>
            deckAnswers.map((item) => <button type='button' value={item}/>);
          }
        } 
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  questions: state.quiz.results,
});

export default connect(mapStateToProps)(Quiz);
