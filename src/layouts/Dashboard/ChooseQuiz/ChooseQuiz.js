import React from 'react';
import QuizCards from '../../../components/Quiz/QuizCards/QuizCards';
import classes from './ChooseQuiz.module.css'

const ChooseQuiz = (props) => {
  return (
    <div className={classes.ChooseQuiz}>
      <QuizCards quizzes={props.quizzes} clickOnQuiz={props.clickOnQuiz}/>
      <div onClick={props.createQuiz} className={classes.CreateQuiz}>
        <div className={classes.Circle}><i class="fas fa-plus"></i></div>
      </div>
    </div>
  )
}

export default ChooseQuiz;
