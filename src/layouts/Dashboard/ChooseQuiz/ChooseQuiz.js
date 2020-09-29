import React from 'react';
import QuizCards from '../../../components/Quiz/QuizCards/QuizCards';

const ChooseQuiz = (props) => {
  return (
    <div>
      <QuizCards quizzes={props.quizzes} clickOnQuiz={props.clickOnQuiz}/>
      <div onClick={props.createQuiz}>Create quiz</div>
    </div>
  )
}

export default ChooseQuiz;
