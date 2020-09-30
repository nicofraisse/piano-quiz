import React, { useState } from 'react';
import classes from './Dashboard.module.css';
import CreateQuiz from './CreateQuiz/CreateQuiz';
import ChooseQuiz from './ChooseQuiz/ChooseQuiz';
import QuizCards from '../../components/Quiz/QuizCards/QuizCards';

const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      {
        props.showCreateQuiz
        ?
        <CreateQuiz
          click={props.submitQuiz}
          currentQuizzes={props.quizData}
          handleSubmit={props.switchTab}/>
        :
        <ChooseQuiz
          quizzes={props.quizData}
          clickOnQuiz={props.selectQuiz}
          createQuiz={props.switchTab} />
      }
      <div onClick={props.switchTab}>Back</div>
    </div>
  );
}

export default Dashboard;
